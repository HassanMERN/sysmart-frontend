import { useRouter } from "next/router";

interface ButtonLinkProps {
  route: string;
  text: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ route, text }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return <button onClick={handleClick}>{text}</button>;
};

export default ButtonLink;
