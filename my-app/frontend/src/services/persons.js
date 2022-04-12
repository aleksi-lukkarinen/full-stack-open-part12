import axios from "axios"
import * as conf from "../conf"

function simplified(result) {
  return result.then(response => response.data)
}

function getAllEntries() {
  const url = conf.SERVER_URL_PERSONS
  const result = axios.get(url)
  return simplified(result)
}

function createEntry(entryToAdd) {
  const url = conf.SERVER_URL_PERSONS
  const result = axios.post(url, entryToAdd)
  return simplified(result)
}

function updateEntry(entryToUpdate) {
  const url = `${conf.SERVER_URL_PERSONS}/${entryToUpdate.id}`
  const result = axios.put(url, entryToUpdate)
  return simplified(result)
}

function deleteEntry(idToDelete) {
  const url = `${conf.SERVER_URL_PERSONS}/${idToDelete}`
  const result = axios.delete(url)
  return result
}

const PersonsService = {
  getAll: getAllEntries,
  create: createEntry,
  update: updateEntry,
  delete: deleteEntry,
}

export default PersonsService
