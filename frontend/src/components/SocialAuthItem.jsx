export default function SocialAuthItem({ icon: Icon, href, name }) {
  return (
    <a
      href={href}
      className="bg-gray-200 w-full py-2 flex items-center justify-center gap-2 rounded-xl transition-colors duration-300 hover:bg-gray-300"
    >
      <Icon className="text-gray-500 group-hover:text-gray-700 size-5 transition-transform duration-500 group-hover:scale-110" />
      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
        {name}
      </span>
    </a>
  );
}
