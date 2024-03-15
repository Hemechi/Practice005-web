
import { Card } from 'flowbite-react';

type CardComponentProps = {
    title: string;
    image: string;
    price: string;
}

export default function CardComponent(props: CardComponentProps) {
  return (
    <Card
    className="max-w-sm h-[400px]"
    renderImage={() => <img className="h-[650px] overflow-hidden object-contain p-5" src={props.image} alt="images"/> }
  >
    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
      {props.title}
    </h5>
    <p className="text-3xl font-bold text-gray-700 dark:text-gray-900">
      {props.price}$
    </p>
  </Card>
  );
}
