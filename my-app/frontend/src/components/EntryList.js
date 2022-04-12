import * as conf from "../conf"
import React, { useState } from "react"
import SectionHeader from "./SectionHeader"
import NumberListLine from "./NumberListLine"
import PersonsService from "../services/persons"

const initialFilterState = {
  text: conf.STR_EMPTY,
  filter: conf.STR_EMPTY,
}

function userDisagreesToDeleteEntry(name) {
  const msg = `Do you want to delete entry called "${name}"?`
  const agreement = window.confirm(msg)
  return !agreement
}

const EntryList = ({
        title,
        entries,
        setEntries,
        setInfoMessage,
        setErrorMessage}) => {

  const [nameFilter, setNameFilter] = useState(initialFilterState)

  function deleteEntry(event) {
    const idToDelete = Number(event.target.dataset.id)
    const entryToDelete = entries.find(n => n.id === idToDelete)

    if (userDisagreesToDeleteEntry(entryToDelete.name))
      return

    PersonsService
      .delete(idToDelete)
      .then(() => {
        const msg = `Entry "${entryToDelete.name}" was successfully deleted.`
        setInfoMessage(msg)
        setTimeout(() => setInfoMessage(null), 5000)
      })
      .catch(reason => {
        let msg = `Unable to delete entry ${idToDelete} (${entryToDelete.name}) from the server. ` +
          "Maybe it was deleted earlier or did never exist."
        setErrorMessage(msg)
        setTimeout(() => setErrorMessage(null), 5000)
      })
      .finally(setEntries(entries.filter(e => e.id !== idToDelete)))
  }

  function updateNameFilter(event) {
    const t = event.target.value
    const newState = {
      text: t,
      filter: t.trim().toUpperCase()
    }

    setNameFilter(newState)
  }

  const entryFilterFunc = e =>
    e.name.toUpperCase().includes(nameFilter.filter)

  return (
    <>
      <SectionHeader content={title} />
      <div>
        Filter with:
        <input
            value={nameFilter.text}
            onChange={updateNameFilter} />
      </div>
      {entries.filter(entryFilterFunc)
        .map(e =>
          <NumberListLine
              entry={e} key={e.id}
              deleteHandler={deleteEntry} />
        )
      }
    </>
  )
}

export default EntryList
