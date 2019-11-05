const received = (messages, firstMessageId = null) =>
  messages.map((content, i) => ({
    type: "received",
    content,
    id: i === 0 ? firstMessageId : null,
  }))

const sent = (messages, firstMessageId) =>
  messages.map((content, i) => ({
    type: "sent",
    content,
    id: i == 0 ? firstMessageId : null,
  }))

const question = (content, name, options, messageId = null) => [
  {
    id: messageId,
    type: "received",
    content,
  },
  {
    type: "form",
    fields: [
      {
        type: "options",
        name,
        options,
      },
    ],
  },
  {
    type: "sent",
    content: `{${name}}`,
  },
]
const yesOrNoQuestion = (content, name, messageId) =>
  question(content, name, ["Sim", "Não"], messageId)

const _if = name => [
  {
    type: "if",
    name,
  },
]

const _switch = name => [
  {
    type: "if",
    name,
  },
]

const _skip = (skip_id, id = null) => [
  {
    type: "skip",
    skip_id,
    id,
  },
]

const chatFunctions = {
  received,
  sent,
  question,
  yesOrNoQuestion,
  _switch,
  _skip,
}
export default chatFunctions
