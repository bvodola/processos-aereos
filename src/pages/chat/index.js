import React from "react"
import Chat from "../../components/Chat"

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

const _skip = (skip_id, id) => [
  {
    type: "skip",
    skip_id,
    id,
  },
]

const messageDatabase = [
  // =====
  // Intro
  // =====
  ...received([
    "Olá, {name}. Meu nome é Victor. Sou consultor especialista em processos aéreos",
    "Vou te ajudar a receber sua indenização. Mas primeiro preciso entender um pouco sobre seu caso.",
    "Lembre-se de que a qualquer momento você apertar o ícone do Whatsapp acima e conversar comigo por lá.",
  ]),

  ...question("O que aconteceu com seu voo?", "issue", [
    "Atrasou",
    "Foi cancelado",
    "Bagagem extraviada",
    "Overbooking",
  ]),

  ..._switch("issue"),
  ...yesOrNoQuestion(
    "Seu voo aconteceu a menos de 5 anos?",
    "lessThanFiveYears",
    "issue_Atrasou"
  ),

  ..._switch("lessThanFiveYears"),
  ..._skip("noRights", "lessThanFiveYears_Não"),
  ..._skip("final", "lessThanFiveYears_Sim"),

  ...received(
    [
      "Infelizmente, nesse caso você não tem direito.",
      "Se restou alguma dúvida, você pode apertar o ícone do Whatsapp acima e conversar comigo por lá.",
    ],
    "noRights"
  ),

  {
    id: "contact_preference_Continuar por Whatsapp",
    type: "redirect",
    url: "http://api.whatsapp.com/send?phone=5511940728896",
  },
  {
    id: "final",
    type: "received",
    content: "Obrigado pelo contato, {name}!",
    last: true,
  },
]

export default () => (
  <Chat
    nav={{
      logoHref: "http://indenizamais.com.br/landing/dpvat/1",
      whatsapp: "11963197881",
    }}
    messageInterval={1000}
    messageDatabase={messageDatabase}
    avatarSrc={"/img/victor.jpg"}
  />
)
