export default function Newsletter() {
  return (
    <section className="bg-rafet-noir px-6 py-16 text-center">
      <span className="text-[11px] tracking-[3px] text-rafet-gris">RESTEZ CONNECTÉE</span>
      <h2 className="font-serif text-2xl md:text-3xl text-white mt-3 mb-4">Accès Privilégié</h2>
      <p className="text-sm text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
        Abonnez-vous et soyez la première à découvrir nos nouvelles collections,
        offres exclusives et invitations aux événements privés.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex max-w-sm mx-auto"
      >
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          required
          className="flex-1 bg-white/10 text-white placeholder-white/40 text-sm px-4 py-3 outline-none focus:bg-white/15 transition-colors"
        />
        <button
          type="submit"
          className="bg-rafet-brun text-white text-xs tracking-widest px-6 hover:bg-rafet-beige hover:text-rafet-noir transition-colors"
        >
          S'ABONNER
        </button>
      </form>

      <p className="text-[11px] text-white/40 mt-4">Aucun spam. Désabonnement possible à tout moment.</p>
    </section>
  )
}
