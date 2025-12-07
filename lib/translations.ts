export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    // HEADER
    subtitle: "Édition Master 2025",
    gained: "Gagné",
    guide_btn: "Guide",
    
    // GUIDE (MODAL)
    guide_title: "Parcours d'acquisition Qurtuba",
    guide_desc: "Les 5 étapes clés pour devenir propriétaire, expliquées simplement.",
    step1_title: "Devenir Membre",
    step1_desc: "Remplir le formulaire, payer les frais d'adhésion (75$) et acheter vos premières parts sociales (min. 2000$).",
    step2_title: "L'Objectif 60 000 $",
    step2_desc: "Vous devez accumuler 60 000 $ de parts pour être inscrit sur la liste d'attente prioritaire. C'est votre apport initial.",
    step3_title: "Lettre d'autorisation",
    step3_desc: "Quand c'est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors 3 mois pour trouver une maison.",
    step4_title: "Offre d'achat & Inspection",
    step4_desc: "Vous faites une offre au nom de \"Coopérative Qurtuba\". Une fois acceptée, l'inspection est obligatoire.",
    step5_title: "Notaire & Emménagement",
    step5_desc: "Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si > 60k) et payez les frais de démarrage.",
    
    // CONTROLS
    price: "Prix Propriété",
    downPayment: "Apport Initial",
    duration: "Durée",
    years: "ans",
    configure: "Configurer",
    close: "Fermer",
    masquer: "Masquer options",
    
    charges_title: "Charges Annuelles",
    municipal: "Municipale",
    school: "Scolaire",
    insurance: "Assurance",
    hydro: "Hydro",
    maintenance: "Maintenance / Condo",
    
    strategy_title: "Stratégie Accélérée",
    extra_monthly: "Extra Mensuel",
    extra_annual: "Extra Annuel (Lump sum)",
    appreciation: "Appréciation Maison (An)",
    
    costs_title: "Coûts de Démarrage",
    welcome_tax: "Taxe Bienvenue",
    notary: "Notaire & Frais",
    cash_required: "CASH REQUIS",
    costs_note: "*Inclut mise de fonds, taxe de bienvenue estimée et frais de clôture.",
    
    // KPIS
    monthly_total: "Mensualité Totale",
    financing: "Financement",
    charges: "Charges",
    income_required: "Revenu Requis",
    gross_family: "Brut familial (Ratio 32%)",
    net_at: "Net à",
    end: "Fin",
    cost_financing: "Coût Financement (Loyer)",
    total_fees: "Total des frais sur la durée",
    economy: "Économie",
    error_max_reached: "Financement Max atteint",
    
    // CHARTS
    visual_analysis: "Analyse Visuelle",
    detailed_table: "Tableau Détaillé",
    tab_debt: "Dette",
    tab_networth: "Patrimoine",
    tab_repartition: "Répartition",
    
    chart_yours: "Votre Scénario",
    chart_standard: "Trajectoire Standard",
    chart_rent: "Frais (Loyer)",
    chart_capital: "Capital",
    chart_balance_yours: "Votre Solde",
    chart_balance_std: "Solde Standard",
    
    chart_house: "Valeur Maison",
    chart_equity: "Équité Nette",
    chart_debt: "Dette Restante",
    
    pie_capital: "Capital (Maison)",
    pie_interest: "Coût Financement",
    pie_charges: "Charges & Taxes",
    pie_total: "Total Payé",
    
    // TABLE
    col_year: "Année",
    col_month: "Mois",
    col_rent: "Frais (Loyer)",
    col_capital: "Capital (Parts)",
    col_total: "Déboursé Total",
    col_balance: "Solde Restant",
    year_row: "Année",
    view_yearly: "Vue Annuelle",
    
    // FOOTER
    disclaimer_title: "Avis de non-responsabilité",
    disclaimer_text: "Ce simulateur est un outil pédagogique fourni à titre indicatif seulement. Il ne constitue pas une offre de financement officielle.",
    copyright: "© 2025 Qurtuba Simulator.",
    
    // ALERTS
    error_title: "Financement Impossible",
    error_desc: "Plafond de financement atteint.",
    error_missing: "Il manque",
    error_downpayment: "d'apport",
    btn_fix: "Ajouter la différence",
    warning_downpayment: "Apport Insuffisant",
  },
  
  en: {
    // HEADER
    subtitle: "Master Edition 2025",
    gained: "Saved",
    guide_btn: "Guide",
    
    // GUIDE (MODAL)
    guide_title: "Qurtuba Acquisition Path",
    guide_desc: "The 5 key steps to becoming a homeowner, explained simply.",
    step1_title: "Become a Member",
    step1_desc: "Fill out the form, pay the membership fee ($75) and buy your first social shares (min. $2000).",
    step2_title: "The $60,000 Goal",
    step2_desc: "You must accumulate $60,000 in shares to be listed on the priority waiting list. This is your initial down payment.",
    step3_title: "Authorization Letter",
    step3_desc: "When it's your turn, Qurtuba sends you an official letter. You then have 3 months to find a house.",
    step4_title: "Purchase Offer & Inspection",
    step4_desc: "You make an offer on behalf of \"Coopérative Qurtuba\". Once accepted, inspection is mandatory.",
    step5_title: "Notary & Moving In",
    step5_desc: "Qurtuba designates the notary. You bring the rest of your down payment (if > 60k) and pay startup fees.",

    // CONTROLS
    price: "Property Price",
    downPayment: "Down Payment",
    duration: "Duration",
    years: "years",
    configure: "Configure",
    close: "Close",
    masquer: "Hide options",
    
    charges_title: "Annual Expenses",
    municipal: "Municipal",
    school: "School Tax",
    insurance: "Insurance",
    hydro: "Hydro / Elec",
    maintenance: "Maintenance / Condo",
    
    strategy_title: "Accelerated Strategy",
    extra_monthly: "Monthly Extra",
    extra_annual: "Annual Extra (Lump sum)",
    appreciation: "House Appreciation (Yr)",
    
    costs_title: "Startup Costs",
    welcome_tax: "Welcome Tax",
    notary: "Notary & Fees",
    cash_required: "CASH REQUIRED",
    costs_note: "*Includes down payment, estimated welcome tax, and closing costs.",
    
    // KPIS
    monthly_total: "Total Monthly",
    financing: "Financing",
    charges: "Expenses",
    income_required: "Income Required",
    gross_family: "Gross Family (Ratio 32%)",
    net_at: "Net at",
    end: "End",
    cost_financing: "Financing Cost (Rent)",
    total_fees: "Total fees over duration",
    economy: "Savings",
    error_max_reached: "Max financing reached",
    
    // CHARTS
    visual_analysis: "Visual Analysis",
    detailed_table: "Detailed Table",
    tab_debt: "Debt",
    tab_networth: "Net Worth",
    tab_repartition: "Distribution",
    
    chart_yours: "Your Scenario",
    chart_standard: "Standard Path",
    chart_rent: "Fees (Rent)",
    chart_capital: "Principal",
    chart_balance_yours: "Your Balance",
    chart_balance_std: "Standard Balance",
    
    chart_house: "House Value",
    chart_equity: "Net Equity",
    chart_debt: "Remaining Debt",
    
    pie_capital: "Principal (House)",
    pie_interest: "Financing Cost",
    pie_charges: "Expenses & Taxes",
    pie_total: "Total Paid",
    
    // TABLE
    col_year: "Year",
    col_month: "Month",
    col_rent: "Fees (Rent)",
    col_capital: "Principal",
    col_total: "Total Outflow",
    col_balance: "Balance",
    year_row: "Year",
    view_yearly: "Yearly View",
    
    // FOOTER
    disclaimer_title: "Disclaimer",
    disclaimer_text: "This simulator is an educational tool for indicative purposes only. It does not constitute an official financing offer.",
    copyright: "© 2025 Qurtuba Simulator.",
    
    // ALERTS
    error_title: "Financing Impossible",
    error_desc: "Financing cap reached.",
    error_missing: "Missing",
    error_downpayment: "down payment",
    btn_fix: "Add difference",
    warning_downpayment: "Insufficient Down Payment",
  }
};