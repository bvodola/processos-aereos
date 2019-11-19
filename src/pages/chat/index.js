import React from "react"
import Chat, {
  received,
  question,
  yesOrNoQuestion,
  _switch,
  _skip,
  sent,
} from "../../components/Chat/Chat"

const messageDatabase = [
  // =====
  // Intro
  // =====
  ...received([
    "Olá! Sou o Alexandre, consultor especialista em processos aéreos",
    "Vou te ajudar a receber sua indenização. Vamos entender um pouco sobre seu caso.",
    "Qual seu nome, por favor?",
  ]),

  {
    type: "form",
    fields: [
      {
        name: "nome",
        type: "text",
        autoFocus: true,
      },
    ],
  },
  ...sent(["{nome}"]),
  ...received(["Ok, {nome}! E qual número do seu celular com DDD?"]),
  {
    type: "form",
    fields: [
      {
        name: "celular",
        type: "text",
        htmlType: "tel",
        mask: "(99) 99999-9999",
        autoFocus: true,
      },
    ],
  },
  ...sent(["{celular}"]),
  ...received([
    "Obrigado pelas informações, {nome}! Lembre-se: A qualquer momento você apertar o ícone do Whatsapp acima e conversar comigo por lá.",
  ]),

  // ==================
  // Problema principal
  // ==================
  ...question("O que aconteceu com seu voo?", "problema", [
    "Atrasou",
    "Foi cancelado",
    "Bagagem extraviada",
    "Overbooking",
  ]),

  // ================
  // Menos de 5 anos?
  // ================
  ...yesOrNoQuestion("Isso aconteceu a menos de 5 anos?", "menosDe5Anos"),
  ..._switch("menosDe5Anos"),

  // Menos de 5 anos: NÃO
  {
    type: "header",
    id: "menosDe5Anos_Não",
  },
  ..._skip("naoTemDireitos"),

  // Menos de 5 anos: SIM
  {
    type: "header",
    id: "menosDe5Anos_Sim",
  },

  // Switch do problema principal
  ..._switch("problema"),

  // =======
  // Atrasou
  // =======
  {
    type: "header",
    id: "problema_Atrasou",
  },

  // Mais de 4 horas?
  ...yesOrNoQuestion("Seu voo atrasou mais do que 4 horas?", "maisDe4Horas"),
  ..._switch("maisDe4Horas"),

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

  // Perdeu compromisso ou conexão?
  ...yesOrNoQuestion(
    "Você perdeu compromisso importante ou conexão por causa desse atraso?",
    "perdeuCompromisso"
  ),
  ..._switch("perdeuCompromisso"),

  {
    type: "header",
    id: "perdeuCompromisso_Sim",
  },
  ..._skip("formularioLead"),

  {
    type: "header",
    id: "perdeuCompromisso_Não",
  },
  ..._skip("naoTemDireitos"),

  // =============
  // Foi Cancelado
  // =============
  {
    type: "header",
    id: "problema_Foi cancelado",
  },
  // Informado com mais de 72h?
  ...yesOrNoQuestion(
    "Você foi informado do cancelamento com menos de 72 horas de antecedência?",
    "menosDe72Horas"
  ),
  ..._switch("menosDe72Horas"),

  // Menos de 72 horas: SIM
  {
    type: "header",
    id: "menosDe72Horas_Sim",
  },
  ..._skip("formularioLead"),

  // Menos de 72 horas: NÃO
  {
    type: "header",
    id: "menosDe72Horas_Não",
  },
  ..._skip("naoTemDireitos"),

  // ==================
  // Bagagem Extraviada
  // ==================
  {
    type: "header",
    id: "problema_Bagagem extraviada",
  },
  // Tipo de Voo?
  ...question("Era um voo doméstico ou internacional?", "tipoDeVoo", [
    "Doméstico",
    "Internacional",
  ]),
  ..._switch("tipoDeVoo"),

  // Voo Doméstico
  {
    type: "header",
    id: "tipoDeVoo_Doméstico",
  },

  ...yesOrNoQuestion(
    "Você demorou mais de 7 dias para receber a bagagem?",
    "demorouMaisDe7"
  ),
  ..._switch("demorouMaisDe7"),

  {
    type: "header",
    id: "demorouMaisDe7_Sim",
  },
  ..._skip("empresaPagouGastos"),

  {
    type: "header",
    id: "demorouMaisDe7_Não",
  },
  ..._skip("naoTemDireitos"),

  // Voo Internacional
  {
    type: "header",
    id: "tipoDeVoo_Internacional",
  },
  ...yesOrNoQuestion(
    "Você demorou mais de 21 dias para receber a bagagem?",
    "demorouMaisDe21"
  ),
  ..._switch("demorouMaisDe21"),

  {
    type: "header",
    id: "demorouMaisDe21_Sim",
  },
  ..._skip("formularioLead"),

  {
    type: "header",
    id: "demorouMaisDe21_Não",
  },
  ..._skip("empresaPagouGastos"),

  // Empresa pagou gastos?
  {
    type: "header",
    id: "empresaPagouGastos",
  },
  ...yesOrNoQuestion(
    "A empresa pagou os gastos emergenciais desse período?",
    "empresaPagouGastos"
  ),
  ..._switch("empresaPagouGastos"),
  {
    type: "header",
    id: "empresaPagouGastos_Não",
  },
  ..._skip("formularioLead"),
  {
    type: "header",
    id: "empresaPagouGastos_Sim",
  },
  ..._skip("naoTemDireitos"),

  // ===========
  // Overbooking
  // ===========
  {
    type: "header",
    id: "problema_Overbooking",
  },
  ...yesOrNoQuestion(
    "Você demorou mais de 2 horas para embarcar?",
    "maisDe2Horas"
  ),
  ..._switch("maisDe2Horas"),
  {
    type: "header",
    id: "maisDe2Horas_Sim",
  },
  ..._skip("formularioLead"),

  {
    type: "header",
    id: "maisDe2Horas_Não",
  },
  ..._skip("naoTemDireitos"),

  // ===================
  // Formulário de Leads
  // ===================
  {
    type: "header",
    id: "formularioLead",
  },
  ...received([
    "Boas notícias, {nome}. Você tem SIM direito a uma indenização.",
  ]),
  ..._skip("final"),

  // ================
  // Não tem direitos
  // ================
  {
    type: "header",
    id: "naoTemDireitos",
  },
  ...received(["Infelizmente, nesse caso você não tem direito."]),
  ..._skip("final"),

  // =====
  // Final
  // =====
  {
    type: "header",
    id: "final",
  },
  ...yesOrNoQuestion(
    "Gostaria de continuar a conversa por Whatsapp?",
    "conversarNoWhatsapp"
  ),
  ..._switch("conversarNoWhatsapp"),
  {
    type: "header",
    id: "conversarNoWhatsapp_Sim",
  },
  {
    type: "redirect",
    url: "https://wa.me/5511994695279",
  },
  {
    type: "header",
    id: "conversarNoWhatsapp_Não",
  },
  ...received([
    "Obrigado pelo contato, {nome}! Em breve eu retorno para continuarmos o atendimento.",
  ]),
]

export default () => (
  <Chat
    nav={{
      logo: "/img/pa-logo.png",
      phone: "(11) 99469-5279",
      whatsapp: "11994695279",
    }}
    initialFormData={{
      company: "processo-aereo",
    }}
    messageInterval={700}
    messageDatabase={messageDatabase}
    avatarSrc={"/img/alexandre.jpg"}
  />
)
