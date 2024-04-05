
let participantes = [
  {
    nome: "Kerven Ayres",
    email: "kerven.ayres@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 20),
    dataChekIn: new Date(2024, 2, 22, 22, 00)
  },
  {
    nome: "Raphael Oliveira",
    email: "dundaswest@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 30),
    dataChekIn: null
  },
  {
    nome: "Nicolas Flmael",
    email: "nicolasmazepin@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 00),
    dataChekIn: new Date(2024, 2, 22, 22, 20)
  },
  {
    nome: "Ana Clara",
    email: "anaclara@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 15),
    dataChekIn: new Date(2024, 2, 22, 22, 30)
  },
  {
    nome: "Pedro Costa",
    email: "pedro.costa@example.com",
    dataInscricao: new Date(2024, 2, 22, 20, 30),
    dataChekIn: new Date(2024, 2, 22, 22, 40)
  },
  {
    nome: "Mariana Almeida",
    email: "mariana.almeida@example.com",
    dataInscricao: new Date(2024, 2, 22, 20, 45),
    dataChekIn: null
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 22, 21, 00),
    dataChekIn: new Date(2024, 2, 22, 23, 00)
  },
  {
    nome: "Carla Martins",
    email: "carla.martins@example.com",
    dataInscricao: new Date(2024, 2, 22, 21, 15),
    dataChekIn: new Date(2024, 2, 22, 23, 10)
  },
  {
    nome: "Ricardo Pereira",
    email: "ricardo.pereira@example.com",
    dataInscricao: new Date(2024, 2, 22, 21, 30),
    dataChekIn: new Date(2024, 2, 22, 23, 20)
  },
  {
    nome: "Sara Ferreira",
    email: "sara.ferreira@example.com",
    dataInscricao: new Date(2024, 2, 22, 21, 45),
    dataChekIn: null
  }
];
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataChekIn = dayjs(Date.now())
  .to(participante.dataChekIn) 

  // condicional
  if(participante.dataChekIn == null) {
    dataChekIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerChekIn(event)" 
      >
        Confirma check-in
      </button>
    `


  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataChekIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const fromData = new FormData(event.target)

  const participante = {
    nome: fromData.get('nome'),
    email: fromData.get('email'),
    dataInscricao: new Date(),
    dataChekIn: null
  }
  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }
  
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerChekIn = (event) => {
  //confirmar se realmente quer o chek-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  participante.dataChekIn = new Date()
  atualizarLista(participantes)
}