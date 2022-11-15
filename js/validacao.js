export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput,input)
    }
}
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError'
]

const mensagensDeErro = {
   nome: {
    valueMissing:'O campo nome não pode estar vazio.'
   },
   email:{
    valueMissing:'O campo email não pode estar vazio.',
    typeMismatch: 'O email digitado não é válido'
   },
   senha:{
    valueMissing:'O campo senha não pode estar vazio',
    patterMismatch:'a senha deve conter entre 6 a 12 caracteres deve conter pelo menos uma letra maiuscula, um numero e não deve conter simbolos'
   },
   dataNascimento: {
    valueMissing:'O campo data de nascimento nao pode estar vazio',
    customError:'Voce de ser maior que 18 anos para se cadastrar.'
   }
    
}
const validadores= {
    DataNascimento:input => validaDataNascimento(input)
}
function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}
function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''
    
    if(!maiorQue18(dataRecebida)){
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }
    input.setCustomValidity(mensagem)
}

function maiorQue18(data){
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCFullMonth(), data.getUTCFullDate())

    return dataMais18 <= dataAtual 
}