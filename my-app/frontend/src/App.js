import * as conf from "./conf"
import React, { useState, useEffect } from "react"
import PageHeader from "./components/PageHeader"
import EntryList from "./components/EntryList"
import EntryAddingForm from "./components/EntryAddingForm"
import PersonsService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [entries, setEntries] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const loadDB = () => {
    PersonsService.getAll().then(data => setEntries(data))
  }
  useEffect(loadDB, [])

  return (
    <>
      <PageHeader content={conf.APP_TITLE} />

      <EntryAddingForm
        title={conf.SECTION_TITLE_NEW_ENTRY}
        entries={entries}
        setEntries={setEntries}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage} />

      <Notification
        content={errorMessage}
        baseClass={"notificationBox"}
        messageVisibleClass={"errorVisible"} />

      <Notification
        content={infoMessage}
        baseClass={"notificationBox"}
        messageVisibleClass={"infoVisible"} />

      <EntryList
        title={conf.SECTION_TITLE_SAVED_ENTRIES}
        entries={entries}
        setEntries={setEntries}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage} />
    </>
  )

}

export default App
