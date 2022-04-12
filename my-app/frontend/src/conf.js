export const TEMPLATE_MARK = "{}"
export const STR_EMPTY = ""
export const STR_KEY_VALUE_SEP = ":"

export const SERVER_URL_BASE =
        process.env.REACT_APP_PHONEBOOK_SERVER_URL || "/api/"
export const SERVER_URL_PERSONS = SERVER_URL_BASE + "persons"

export const APP_TITLE = "Phonebook"
export const SECTION_TITLE_NEW_ENTRY = "Add a New Entry"
export const SECTION_TITLE_SAVED_ENTRIES = "Saved Entries"

export const MSG_DUP_ENTRY_UPDATE =
    "A person with name {} has already been added to the phonebook. " +
    "Would you like to update their information?"

export const ERR_ADDING_EMPTY_NAME = "An empty name cannot be added to the phonebook."
export const ERR_ADDING_EMPTY_PHONENUMBER = "An empty phone number cannot be added to the phonebook."
