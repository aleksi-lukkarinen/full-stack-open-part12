import * as conf from "../conf"

const NumberListLine = ({entry, deleteHandler}) => {
  return <div>
      {entry.name}{conf.STR_KEY_VALUE_SEP} {entry.phoneNumber}
      <button
          data-id={entry.id}
          onClick={deleteHandler}>Delete</button>
    </div>
}

export default NumberListLine
