import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  src?: string | null;
};
const Avatar = ({ src }: Props) => {
  if (!src) return <FaUserCircle size="24" />;

  return (
    <Image
      src={src}
      alt="avatar"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
