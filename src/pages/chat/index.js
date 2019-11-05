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

const _skip = (skip_id, id = null) => [
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

  ...question("O que aconteceu com seu voo?", "problema", [
    "Atrasou",
    "Foi cancelado",
    "Bagagem extraviada",
    "Overbooking",
  ]),

  ..._switch("problema"),

  // Atrasou
  {
    type: "header",
    id: "problema_Atrasou",
  },

  // Menos de 5 anos?
  ...yesOrNoQuestion("Seu voo aconteceu a menos de 5 anos?", "menosDe5Anos"),
  ..._switch("menosDe5Anos"),

  // Menos de 5 anos: SIM
  {
    type: "header",
    id: "menosDe5Anos_Sim",
  },

  // Mais de 4 horas?
  ...yesOrNoQuestion("Seu voo atrasou mais do que 4 horas?", "maisDe4Horas"),

  // Mais de 4 horas: SIM
  {
    type: "header",
    id: "maisDe4Horas_Sim",
  },
  ..._skip("formularioLead"),

  // Mais de 4 horas: NÃO
  {
    type: "header",
    id: "maisDe4Horas_Não",
  },

  // Menos de 5 anos: NÃO
  {
    type: "header",
    id: "menosDe5Anos_Não",
  },
  ..._skip("naoTemDireitos"),

  {
    type: "header",
    id: "formularioLead",
  },
  ...received(["Uhul!"]),

  {
    type: "header",
    id: "naoTemDireitos",
  },
  ...received([
    "Infelizmente, nesse caso você não tem direito.",
    "Se restou alguma dúvida, você pode apertar o ícone do Whatsapp acima e conversar comigo por lá.",
  ]),
]

export default () => (
  <Chat
    nav={{
      logoHref: "http://indenizamais.com.br/landing/dpvat/1",
      whatsapp: "11963197881",
    }}
    messageInterval={1}
    messageDatabase={messageDatabase}
    avatarSrc={"/img/victor.jpg"}
  />
)
