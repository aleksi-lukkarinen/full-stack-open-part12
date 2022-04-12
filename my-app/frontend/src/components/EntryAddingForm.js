import * as conf from "../conf"
import React, {useState} from 'react'
import SectionHeader from "./SectionHeader"
import PersonsService from "../services/persons"

const EntryAddingForm = ({
        title,
        entries,
        setEntries,
        setInfoMessage,
        setErrorMessage}) => {

  const [newName, setNewName] = useState(conf.STR_EMPTY)
  const [newPhoneNumber, setNewPhoneNumber] = useState(conf.STR_EMPTY)

  function showInfoMessage(content) {
    setInfoMessage(content)
    setTimeout(() => setInfoMessage(null), 5000)
  }

  function showErrorMessage(content) {
    setErrorMessage(content)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  function addEntry(event) {
    event.preventDefault()

    // Are trim() and toUpperCase() *exactly* the same
    // on the client and the server? If not, this will fail
    // and the existence of an entry should be queried from
    // the server.

    const trimmedName = newName.trim()
    if (trimmedName.length < 1) {
      showErrorMessage(conf.ERR_ADDING_EMPTY_NAME)
    }
    else {
      const ucaseName = trimmedName.toUpperCase()
      const testIfNameExists = e => e.name.toUpperCase() === ucaseName
      const existingEntry = entries.find(testIfNameExists)
      if (existingEntry) {
        const msg = conf.MSG_DUP_ENTRY_UPDATE.replace(
                      conf.TEMPLATE_MARK, existingEntry.name)
        const userAgrees = window.confirm(msg)
        if (userAgrees) {
          const entryToUpdate = {
            ...existingEntry,
            phoneNumber: newPhoneNumber,
          }
          PersonsService
            .update(entryToUpdate)
            .then(data => {
              const newEntries = entries.map(e =>
                      e.id !== entryToUpdate.id ? e : data)
              setEntries(newEntries)

              showInfoMessage(
                `Entry "${entryToUpdate.name}" was successfully updated.`)
            })
        }
      }
      else {
        const entryToAdd = {
          name: newName,
          phoneNumber: newPhoneNumber,
        }

        PersonsService
          .create(entryToAdd)
          .then(data => {
            setEntries(entries.concat(data))

            showInfoMessage(
              `Entry "${entryToAdd.name}" was successfully added.`)
          })
          .catch(error => {
            let msg = `Adding entry ${entryToAdd.name} failed`

            try {
              if (error.request.status === 400) {
                const responseData =
                          JSON.parse(error.request.response)
                if (responseData.errors &&
                      Array.isArray(responseData.errors)) {
                  msg += " for the following reason"
                  if (responseData.errors.length === 1) {
                    msg += ": " + responseData.errors[0].message
                    if (!msg.endsWith("."))
                      msg += "."
                  }
                  else {
                    msg += "s:"
                    for (let i=0; i<responseData.errors.length; i++) {
                      msg += ` (${i + 1}) ` + responseData.errors[i].message
                      if (!msg.endsWith("."))
                        msg += "."
                    }
                  }
                }
              }
            }
            catch {
              msg += " for an unexpected reason"
            }

            showErrorMessage(msg)
          })
      }
    }
    clearFields()
  }

  function clearFields() {
    setNewName(conf.STR_EMPTY)
    setNewPhoneNumber(conf.STR_EMPTY)
  }

  const updateName = (event) =>
    setNewName(event.target.value)

  const updatePhoneNumber = (event) =>
    setNewPhoneNumber(event.target.value)

  return (
    <>
      <SectionHeader content={title} />
      <form onSubmit={addEntry}>
        <div>
          Name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          Number: <input value={newPhoneNumber} onChange={updatePhoneNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default EntryAddingForm
