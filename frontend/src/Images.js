import PlainBase from './images/plain_base.png'
import BlueberryBase from './images/blueberry_base.png'
import ChocchipBase from './images/chocchip_base.png'
import WhitechocchipBase from './images/whitechocchip_base.png'

import VanillaIcing from './images/vanilla_icing.png'
import ChocIcing from './images/choc_icing.png'
import StrawberryIcing from './images/strawberry_icing.png'
import CaramelIcing from './images/caramel_icing.png'

import nothing from './images/nothing.png'
import SprinkleToppings from './images/sprinkle_toppings.png'
import ChocolateToppings from './images/chocolate_toppings.png'
import OreoToppings from './images/oreo_toppings.png'

const Images = [
  [
    {
      src: PlainBase,
      title: 'Plain',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: BlueberryBase,
      title: 'Blueberry',
      width: '22.5%',
      cost: 1.20,
    },
    {
      src: ChocchipBase,
      title: 'Chocolate',
      width: '22.5%',
      cost: 1.20,
    },
    {
      src: WhitechocchipBase,
      title: 'White Chocolate',
      width: '22.5%',
      cost: 1.20,
    },
  ],
  [
    {
      src: StrawberryIcing,
      title: 'Strawberry',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: VanillaIcing,
      title: 'Vanilla',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: ChocIcing,
      title: 'Chocolate',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: CaramelIcing,
      title: 'Caramel',
      width: '22.5%',
      cost: 1.00,
    },
  ],
  [
    {
      src: nothing,
      title: 'None',
      width: '22.5%',
      cost: 0.00,
    },
    {
      src: SprinkleToppings,
      title: 'Sprinkles',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: ChocolateToppings,
      title: 'Chocolate',
      width: '22.5%',
      cost: 1.00,
    },
    {
      src: OreoToppings,
      title: 'Oreos',
      width: '22.5%',
      cost: 1.50,
    },
  ]
]

export default Images