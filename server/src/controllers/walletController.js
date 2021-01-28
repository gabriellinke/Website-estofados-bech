let exports.walletbutton = async (req, res, next) => {

  console.log(req.body)
  const mercadopago = require("mercadopago");

  require("dotenv").config();

  // Configura credenciais
  mercadopago.configure({
    //insert your access_token
    access_token: process.env.ACCESS_TOKEN
  });

  const {
    id,
    productName,
    quantity,
    price,
    freightPrice,
    condition,
    name,
    surname,
    email,
    area_code,
    phone,
    cpf,
    cep,
    state,
    city,
    neighborhood,
    street,
    number,
    adjunct,
    userId,
    userName,
    userSurname,
    userEmail,
  } = req.body;

  // Os parâmetros virão em uma string, com os valores separados por @
  let vetorId = id.split("@")
  let vetorNome = productName.split("@")
  let vetorQuantidade = quantity.toString().split("@")
  let vetorPreco = price.toString().split("@")
  let vetorParcelas = condition.toString().split("@")

  let itemsArray = [{
    id: 0,
    title: 0,
    currency_id: "BRL",
    quantity: 0,
    unit_price: 0
  }]

  // Os produtos vão ser botados no array de items 
  for(let i = 0; i < vetorPreco.length; i++)
  {
    itemsArray[i] = {
      id: vetorId[i],
      title: vetorNome[i],
      currency_id: "BRL",
      quantity: parseInt(vetorQuantidade[i]),
      unit_price: parseFloat(vetorPreco[i])
    }
  }

  // Na última posição do array vai ficar o frete
  itemsArray[itemsArray.length] = {
    id: 0,
    title: "Frete",
    currency_id: "BRL",
    quantity: 1,
    unit_price: freightPrice
  }

  const parcelas = Math.min(...vetorParcelas); //Pega a menor quantidade de parcelas

  let preference = {
    items: itemsArray,
    payer: {
        name: name,
        surname: surname,
        email: email,
        phone: {
            area_code: area_code,
            number: phone
        },
        identification: {
            type: "CPF",
            number: cpf
        },
        address: {
          street_name: street,
          street_number: parseInt(number),
          zip_code: cep
        }
    },
    payment_methods: {
      installments: parseInt(parcelas)
    },
    back_urls: {
      success: process.env.SUCCESS_BACK_URL,
      failure: process.env.FAILURE_BACK_URL,
      pending: process.env.PENDING_BACK_URL
    },
    auto_return: "approved",
  }

  try {
    const pref = await mercadopago.preferences.create(preference);

    const url = pref.body.init_point;
    const checkout_id = pref.body.id

    const checkoutInfo = {
      product_id: id,
      productName,
      quantity,
      price,
      freightPrice,

      name,
      surname,
      email,
      area_code,
      phone,
      cpf,

      cep,
      state,
      city,
      neighborhood,
      street,
      number,
      adjunct,

      url,
      checkout_id,

      userId,
      userName,
      userSurname,
      userEmail,
    }

    return res.json({
      checkoutInfo
    });
  }catch(err){
    return res.send(err.message);
  }
  
};
