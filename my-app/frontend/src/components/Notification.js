const Notification = ({ content, baseClass, messageVisibleClass }) => {
  if (content === null)
    content = ""

  let classes = baseClass
  if (content !== null && content.length > 0)
    classes += " " + messageVisibleClass

  return <div className={classes}>{content}</div>
}

export default Notification
