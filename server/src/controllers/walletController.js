exports.walletbutton = async (req, res, next) => {

  console.log(req.body)
  // require("dotenv").config();
  const mercadopago = require("mercadopago");

  // Configura credenciais
  mercadopago.configure({
    //insert your access_token
    access_token: "TEST-4283306478544705-062216-3333dd3ca66b6ea28756706260ef82d2-267468177"
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
  } = req.body;

  let preference = {
    "items": [
        {
            "id": id,
            "title": productName,
            "currency_id": "BRL",
            "quantity": quantity,
            "unit_price": price
        },
        {
          "title": "Frete",
          "currency_id": "BRL",
          "quantity": 1,
          "unit_price": freightPrice
        }
    ],
    "payer": {
        "name": name,
        "surname": surname,
        "email": email,
        "phone": {
            "area_code": area_code,
            "number": phone
        },
        "identification": {
            "type": "CPF",
            "number": cpf
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
    }

    return res.json({
      checkoutInfo
    });
  }catch(err){
    return res.send(err.message);
  }
  
};
