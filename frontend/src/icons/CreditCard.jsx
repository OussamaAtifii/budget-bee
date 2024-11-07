const CreditCard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24"
    height="24"
    strokeWidth="1.3"
    {...props}
  >
    {' '}
    <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>{' '}
    <path d="M3 10h18"></path> <path d="M16 19h6"></path>{' '}
    <path d="M19 16l3 3l-3 3"></path> <path d="M7.005 15h.005"></path>{' '}
    <path d="M11 15h2"></path>{' '}
  </svg>
)

export default CreditCard
