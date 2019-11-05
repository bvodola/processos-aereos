import React from "react"
import Chat, {
  received,
  question,
  yesOrNoQuestion,
  _switch,
  _skip,
} from "../../components/Chat/Chat"

const messageDatabase = [
  // =====
  // Intro
  // =====
  ...received([
    "Olá, {name}. Meu nome é Victor. Sou consultor especialista em processos aéreos",
    "Vou te ajudar a receber sua indenização. Mas primeiro preciso entender um pouco sobre seu caso.",
    "Lembre-se de que a qualquer momento você apertar o ícone do Whatsapp acima e conversar comigo por lá.",
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
  ...received(["Formulário Lead"]),
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
  ...received([
    "Se restou alguma dúvida, você pode apertar o ícone do Whatsapp acima e conversar comigo por lá.",
  ]),
]

export default () => (
  <Chat
    nav={{
      logo: "/img/pa-logo.png",
      whatsapp: "11963197881",
    }}
    messageInterval={1}
    messageDatabase={messageDatabase}
    avatarSrc={"/img/victor.jpg"}
  />
)
