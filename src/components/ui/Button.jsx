export default function Button({ children, variant = 'brun', className = '', ...props }) {
  const styles = {
    brun: 'bg-rafet-brun text-white hover:bg-rafet-noir',
    beige: 'bg-white text-rafet-brun hover:bg-rafet-beige',
    outline: 'bg-transparent border border-white text-white hover:bg-white hover:text-rafet-brun',
  }

  return (
    <button
      className={`px-6 py-3 text-xs tracking-widest transition-colors duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
