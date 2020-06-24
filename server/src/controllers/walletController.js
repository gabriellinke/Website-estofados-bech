exports.walletbutton = async (req, res, next) => {

//   // require("dotenv").config();
  const mercadopago = require("mercadopago");

  // Configura credenciais
  mercadopago.configure({
    //insert your access_token
    access_token: "TEST-4283306478544705-062216-3333dd3ca66b6ea28756706260ef82d2-267468177"
  });

  let preference = {
    "items": [
        {
            "id": "item-ID-1234",
            "title": "Meu produto",
            "currency_id": "BRL",
            "picture_url": "http://localhost:3333/uploads/1d6ee64eb317-banco9.jpg",
            "description": "Descrição do Item",
            // "category_id": "art",
            "quantity": 45,
            "unit_price": 32.50
        }
    ],
    "payer": {
        "name": "Pedro",
        "surname": "Silva",
        "email": "user@email.com",
        "phone": {
            "area_code": "11",
            "number": 44444444
        },
        "identification": {
            "type": "CPF",
            "number": "19119119100"
        },
        "address": {
            "street_name": "Street",
            "street_number": 123,
            "zip_code": "06233200"
        }
    }
  }

  try {
    const pref = await mercadopago.preferences.create(preference);

    const url = pref.body.init_point;
    const id = pref.body.id

    return res.json({
      url,
      id
    });
  }catch(err){
    return res.send(err.message);
  }
  
};
