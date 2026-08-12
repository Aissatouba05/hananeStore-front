export default function Newsletter() {
  return (
    <section className="px-6 py-16 text-center bg-white">
      <span className="text-[11px] tracking-[3px]" style={{ color: '#B76E79' }}>
        RESTEZ CONNECTÉE
      </span>
      <h2 className="font-serif text-2xl md:text-3xl mt-3 mb-4" style={{ color: '#111111' }}>
        Accès Privilégié
      </h2>
      <p className="text-sm text-rafet-gris max-w-md mx-auto mb-8 leading-relaxed">
        Abonnez-vous et soyez la première à découvrir nos nouvelles collections,
        offres exclusives et invitations aux événements privés.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex max-w-sm mx-auto border border-rafet-beige"
      >
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          required
          className="flex-1 bg-transparent text-rafet-noir placeholder-rafet-gris text-sm px-4 py-3 outline-none"
        />
        <button
          type="submit"
          className="text-white text-xs tracking-widest px-6 transition-colors"
          style={{ backgroundColor: '#B76E79' }}
        >
          S'ABONNER
        </button>
      </form>

      <p className="text-[11px] text-rafet-gris mt-4">Aucun spam. Désabonnement possible à tout moment.</p>
    </section>
  )
}