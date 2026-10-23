/** Páginas por bairro. Texto aprovado pelo Adriano em 23/10/2026 (copy-site-2026-10-23.md).
 * Frases e FAQs marcadas [A CONFIRMAR] foram omitidas. Não inventar dados aqui. */
export type Faq = { q: string; a: string };
export type Bairro = { slug: string; nome: string; h1: string; title: string; meta: string; body: string[]; faq: Faq[] };

const SEG_A =
  "Sou administrador registrado no CRA-RJ 03-06783. São dois seguros de responsabilidade civil profissional, de R$ 1.000.000,00 cada: o da Síndico Né! (pessoa jurídica), na Tokio Marine, e o meu como síndico (pessoa física), na Akad.";

export const BAIRROS: Bairro[] = [
  {
    slug: "sindico-profissional-copacabana",
    nome: "Copacabana",
    h1: "Síndico profissional em Copacabana",
    title: "Síndico profissional em Copacabana | Síndico Né!",
    meta: "Síndico profissional em Copacabana com escritório no bairro. Manutenção, contas claras e assembleias organizadas. Fale no WhatsApp.",
    body: [
      "O escritório da Síndico Né! fica em Copacabana, na Rua Xavier da Silveira. Isso faz diferença no dia a dia, porque quando surge um vazamento, uma obra que não anda ou um problema com fornecedor, eu consigo ir até o prédio rápido.",
      "Copacabana tem de tudo: prédios antigos com muitas unidades, edifícios com comércio no térreo e conjugados com rotatividade alta de moradores. Cada um tem um tipo de desafio. Em prédio antigo, a manutenção preventiva de fachada, elevador, parte elétrica e hidráulica precisa de calendário e de orçamento planejado, para não virar susto na taxa. Em prédio com muito aluguel de temporada, a portaria e o regimento interno precisam estar bem alinhados.",
      "O meu trabalho é organizar tudo isso. Acompanho os fornecedores e os funcionários, faço a previsão orçamentária, cuido da cobrança e mostro as contas de um jeito que qualquer morador entende. As assembleias têm pauta clara e ata registrada.",
      SEG_A,
    ],
    faq: [
      { q: "O síndico profissional precisa morar no prédio?", a: "Não. O Código Civil permite que o síndico seja alguém de fora do condomínio, eleito pela assembleia." },
      { q: "Como funciona a prestação de contas?", a: "Os moradores recebem os balancetes e podem tirar dúvidas comigo." },
      { q: "Quanto custa?", a: "O valor depende do tamanho e da rotina do prédio. Chame no WhatsApp para receber uma proposta." },
    ],
  },
  {
    slug: "sindico-profissional-ipanema",
    nome: "Ipanema",
    h1: "Síndico profissional em Ipanema",
    title: "Síndico profissional em Ipanema | Síndico Né!",
    meta: "Síndico profissional em Ipanema. Cuidado com o patrimônio, fornecedores bem escolhidos e contas transparentes. Fale no WhatsApp.",
    body: [
      "Em Ipanema, o morador costuma ter pouco tempo e muita expectativa em relação ao prédio. Ele quer a área comum bem cuidada, a portaria funcionando e nenhuma surpresa na taxa de condomínio. É aí que o síndico profissional ajuda.",
      "Boa parte dos prédios do bairro tem acabamento e equipamentos que pedem manutenção de qualidade, como elevadores, piscina, sistema de segurança e fachada. Eu monto o calendário de manutenção, faço cotações com mais de um fornecedor e acompanho a execução de perto, para o dinheiro do condomínio ser bem aplicado.",
      "Também cuido da parte que dá mais dor de cabeça: funcionários, cobrança de inadimplentes, conflitos entre vizinhos e obras nas unidades. Tudo isso com registro, para a decisão não depender da memória de ninguém.",
      "As assembleias são preparadas com antecedência, com pauta objetiva e números na mesa. Quem não pode ir consegue entender depois, pela ata, o que foi decidido.",
      "Sou administrador registrado no CRA-RJ 03-06783. A Síndico Né! tem seguro de responsabilidade civil profissional (pessoa jurídica) na Tokio Marine, de R$ 1.000.000,00, e eu tenho um seguro próprio como síndico (pessoa física), na Akad, também de R$ 1.000.000,00.",
    ],
    faq: [
      { q: "O síndico profissional substitui a administradora?", a: "Não. São papéis diferentes. A administradora cuida da parte operacional, como boletos e folha de pagamento. O síndico é quem representa o condomínio e toma as decisões do dia a dia." },
      { q: "Posso falar direto com o síndico?", a: "Sim, pelo WhatsApp (21) 97878-8211." },
    ],
  },
  {
    slug: "sindico-profissional-leblon",
    nome: "Leblon",
    h1: "Síndico profissional no Leblon",
    title: "Síndico profissional no Leblon | Síndico Né!",
    meta: "Síndico profissional no Leblon. Gestão discreta, manutenção planejada e prestação de contas clara. Fale no WhatsApp.",
    body: [
      "No Leblon, muito condomínio procura uma gestão discreta: que resolva as coisas sem barulho, respeite a privacidade dos moradores e mantenha o prédio sempre em ordem. É assim que eu trabalho.",
      "Na prática, isso quer dizer manutenção planejada antes de virar problema, fornecedores bem escolhidos e acompanhados, funcionários orientados e contas abertas para qualquer morador consultar. Quando aparece uma decisão maior, como uma obra de fachada ou a troca de um elevador, ela vai para a assembleia com orçamento comparado e explicação simples.",
      "Muitos prédios do bairro têm síndico morador que já não tem tempo, ou que cansou de resolver problema de vizinho. Com um síndico profissional, a função sai do campo pessoal e vira trabalho com método e responsabilidade.",
      "A responsabilidade também é coberta. A Síndico Né! tem seguro RCP de pessoa jurídica na Tokio Marine, de R$ 1.000.000,00, vigência 2026/2027, e eu tenho um seguro RCP próprio, de pessoa física, na Akad, de R$ 1.000.000,00. Sou administrador registrado no CRA-RJ 03-06783.",
    ],
    faq: [
      { q: "O síndico profissional pode ser destituído?", a: "Sim. A assembleia pode destituir o síndico, seguindo o que diz o Código Civil e a convenção do condomínio." },
      { q: "Quem escolhe os fornecedores?", a: "Eu faço as cotações e apresento as opções. Quando o valor ou a convenção pedirem, a decisão vai para a assembleia ou para o conselho." },
      { q: "Vocês fazem assembleia online?", a: "Sim, desde que a convenção não proíba. A Lei 14.309/2022 autoriza assembleias digitais em condomínio." },
    ],
  },
  {
    slug: "sindico-profissional-botafogo",
    nome: "Botafogo",
    h1: "Síndico profissional em Botafogo",
    title: "Síndico profissional em Botafogo | Síndico Né!",
    meta: "Síndico profissional em Botafogo para prédios antigos e novos. Manutenção, cobrança e assembleias organizadas. Fale no WhatsApp.",
    body: [
      "Botafogo tem prédio dos anos 50 do lado de lançamento recente. Os dois precisam de gestão, mas de jeitos diferentes. No prédio antigo, o foco costuma ser a manutenção estrutural e a regularização. No novo, é colocar a rotina de pé, organizar a garantia da construtora e montar o regimento.",
      "Como síndico profissional, eu assumo essas frentes. Faço o levantamento do que o prédio precisa, monto um plano de manutenção com prioridades e transformo isso em orçamento que cabe na realidade do condomínio. Os moradores sabem para onde vai cada real.",
      "Também cuido da inadimplência com conversa e com os passos que a lei permite, da relação com os funcionários e dos fornecedores. Nas assembleias, levo pauta clara e números, para a decisão ser rápida e bem informada.",
      "O escritório fica em Copacabana, perto de Botafogo, o que facilita as visitas ao prédio.",
      SEG_A,
    ],
    faq: [
      { q: "Como é a transição do síndico anterior?", a: "Eu recebo os documentos, contratos, contas e pendências do síndico anterior e organizo tudo antes de seguir com a rotina." },
      { q: "Quanto tempo dura o mandato?", a: "Até dois anos, com possibilidade de reeleição, como prevê o Código Civil. A convenção pode definir um prazo menor." },
    ],
  },
  {
    slug: "sindico-profissional-flamengo",
    nome: "Flamengo",
    h1: "Síndico profissional no Flamengo",
    title: "Síndico profissional no Flamengo | Síndico Né!",
    meta: "Síndico profissional no Flamengo. Cuidado com prédios antigos, contas claras e presença no condomínio. Fale no WhatsApp.",
    body: [
      "O Flamengo tem muitos prédios grandes e antigos, com várias unidades, garagem compartilhada e equipamentos que já pedem atenção. Nesse tipo de condomínio, uma gestão sem planejamento custa caro, porque o conserto de emergência quase sempre sai mais caro que a manutenção feita no tempo certo.",
      "Meu trabalho como síndico profissional é colocar ordem nisso. Faço o diagnóstico do prédio, defino as prioridades com o conselho e acompanho cada serviço até o fim. Os moradores recebem as contas organizadas e sabem o que está sendo feito.",
      "Em prédio com muita gente, conflito é normal: barulho, vaga de garagem, obra no apartamento do vizinho. Eu cuido disso com base no regimento interno e na convenção, sem levar para o lado pessoal. Isso alivia muito os moradores que hoje fazem esse papel de graça.",
      "Sou administrador registrado no CRA-RJ 03-06783. A Síndico Né! tem seguro RCP de pessoa jurídica na Tokio Marine, de R$ 1.000.000,00, e eu tenho um seguro RCP próprio, de pessoa física, na Akad, de R$ 1.000.000,00.",
    ],
    faq: [
      { q: "Prédio grande paga mais?", a: "O valor depende do tamanho e da complexidade do condomínio. Peça uma proposta pelo WhatsApp." },
      { q: "O síndico responde por erro na gestão?", a: "Sim, o síndico tem responsabilidade civil pelos atos de gestão. Por isso existem os dois seguros RCP: o da Síndico Né!, na Tokio Marine, e o do Adriano, na Akad." },
    ],
  },
];

/** Respostas diretas (answer-first) para a página da Zona Sul. */
export const RESPOSTAS_DIRETAS: Faq[] = [
  { q: "Quanto custa um síndico profissional no RJ?", a: "O valor de um síndico profissional no Rio de Janeiro depende do número de unidades, da estrutura do prédio e da rotina que o condomínio precisa. Na Síndico Né!, a proposta é feita sob medida depois de conhecer o prédio. Para receber a sua, chame no WhatsApp (21) 97878-8211." },
  { q: "Como contratar um síndico profissional pela assembleia?", a: "O síndico profissional é eleito em assembleia, como qualquer síndico, conforme o Código Civil (art. 1.347). Basta convocar a assembleia com a eleição do síndico na pauta, apresentar a proposta e votar com o quórum previsto na convenção. A Síndico Né! ajuda a preparar a convocação e apresenta a proposta aos moradores." },
  { q: "O que acontece se o síndico sair?", a: "Se o síndico renunciar ou for destituído, o condomínio convoca uma nova assembleia para eleger quem assume. Enquanto isso, a convenção costuma indicar quem responde de forma provisória, em geral o subsíndico. Na troca, o síndico que sai deve entregar documentos, contratos e prestação de contas a quem entra." },
  { q: "O síndico profissional tem seguro?", a: "Sim. A Síndico Né! tem um seguro de responsabilidade civil profissional de pessoa jurídica na Tokio Marine, de R$ 1.000.000,00, com vigência 2026/2027. O Adriano Toledo tem, além disso, um seguro de responsabilidade civil profissional de pessoa física na Akad, como síndico, também de R$ 1.000.000,00." },
];

export function faqJsonLd(items: Faq[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
