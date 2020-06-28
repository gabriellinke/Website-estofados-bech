exports.walletbutton = async (req, res, next) => {

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

  let preference = {
    items: [
        {
            id: id,
            title: productName,
            currency_id: "BRL",
            quantity: quantity,
            unit_price: price
        },
        {
          title: "Frete",
          currency_id: "BRL",
          quantity: 1,
          unit_price: freightPrice
        }
    ],
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
    }
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
