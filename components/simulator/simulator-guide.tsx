// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Info, Home } from "lucide-react";

// export function SimulatorGuide() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
//           <Info className="h-4 w-4" />
//           <span className="hidden sm:inline">Guide</span>
//         </Button>
//       </DialogTrigger>

//       {/* Contenu du Modal */}
// <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-border bg-card">
//         {/* En-tête */}
//         <div className="p-6 pb-2">
//             <DialogHeader>
//             <DialogTitle className="text-2xl font-bold">
//                 Parcours d&apos;acquisition Qurtuba
//             </DialogTitle>
//             <DialogDescription className="text-base text-muted-foreground mt-2">
//                 Les 5 étapes clés pour devenir propriétaire, expliquées simplement.
//             </DialogDescription>
//             </DialogHeader>
//         </div>

//         {/* Liste des étapes (Scrollable si l'écran est petit) */}
//         <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
//             <div className="relative">

//                 {/* Ligne verticale de connexion (Timeline) */}
//                 <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border/50 -z-10"></div>

//                 <div className="space-y-8">

//                     {/* ÉTAPE 1 : BLEU */}
//                     <div className="flex gap-5">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-900/20 ring-4 ring-background">
//                             1
//                         </div>
//                         <div className="pt-1">
//                             <h3 className="font-bold text-base text-foreground">Devenir Membre</h3>
//                             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
//                                 Remplir le formulaire, payer les frais d&apos;adhésion (75$) et acheter vos premières parts sociales (min. 2000$).
//                             </p>
//                         </div>
//                     </div>

//                     {/* ÉTAPE 2 : VERT (FOCUS) */}
//                     <div className="flex gap-5">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-green-900/20 ring-4 ring-background">
//                             2
//                         </div>
//                         <div className="pt-1">
//                             <h3 className="font-bold text-base text-foreground">L&apos;Objectif 60 000 $</h3>
//                             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
//                                 Vous devez accumuler 60 000 $ de parts pour être inscrit sur la <span className="text-foreground font-medium">liste d&apos;attente prioritaire</span>. C&apos;est votre apport initial.
//                             </p>
//                         </div>
//                     </div>

//                     {/* ÉTAPE 3 : GRIS */}
//                     <div className="flex gap-5">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border border-border ring-4 ring-background">
//                             3
//                         </div>
//                         <div className="pt-1">
//                             <h3 className="font-bold text-base text-foreground">Lettre d&apos;autorisation</h3>
//                             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
//                                 Quand c&apos;est votre tour, Qurtuba vous envoie une lettre officielle. Vous avez alors <span className="text-foreground font-medium">3 mois</span> pour trouver une maison.
//                             </p>
//                         </div>
//                     </div>

//                     {/* ÉTAPE 4 : GRIS */}
//                     <div className="flex gap-5">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border border-border ring-4 ring-background">
//                             4
//                         </div>
//                         <div className="pt-1">
//                             <h3 className="font-bold text-base text-foreground">Offre d&apos;achat & Inspection</h3>
//                             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
//                                 Vous faites une offre au nom de &quot;Coopérative Qurtuba&quot;. Une fois acceptée, l&apos;inspection est <span className="text-foreground font-medium">obligatoire</span>.
//                             </p>
//                         </div>
//                     </div>

//                     {/* ÉTAPE 5 : MAISON (ICÔNE) */}
//                     <div className="flex gap-5">
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border ring-4 ring-background">
//                             <Home className="h-4 w-4" />
//                         </div>
//                         <div className="pt-1">
//                             <h3 className="font-bold text-base text-foreground">Notaire & Emménagement</h3>
//                             <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
//                                 Qurtuba désigne le notaire. Vous apportez le reste de votre mise de fonds (si &gt; 60k) et payez les frais de démarrage (Taxe bienvenue, etc.).
//                             </p>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Home } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function SimulatorGuide() {
  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 font-medium text-muted-foreground hover:text-primary transition-colors">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">{t('guide_btn')}</span>
        </Button>
      </DialogTrigger>
      
      {/* On utilise max-w-xl pour avoir une largeur confortable comme sur ta capture */}
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-border bg-card block">
        
        {/* En-tête */}
        <div className="p-6 pb-2">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
                {t('guide_title')}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-2">
                {t('guide_desc')}
            </DialogDescription>
            </DialogHeader>
        </div>

        {/* Liste des étapes (Scrollable si l'écran est petit) */}
        <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
            <div className="relative pl-2">
                
                {/* Ligne verticale de connexion (Timeline) */}
                {/* Elle est positionnée pour passer pile derrière les cercles */}
                <div className="absolute left-[18px] top-4 bottom-8 w-[2px] bg-border/50 -z-10"></div>

                <div className="space-y-8">
                    
                    {/* ÉTAPE 1 : BLEU */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-900/20 ring-4 ring-card z-10">
                            1
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-base text-foreground">{t('step1_title')}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {t('step1_desc')}
                            </p>
                        </div>
                    </div>

                    {/* ÉTAPE 2 : VERT (FOCUS) */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-green-900/20 ring-4 ring-card z-10">
                            2
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-base text-foreground">{t('step2_title')}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {t('step2_desc')}
                            </p>
                        </div>
                    </div>

                    {/* ÉTAPE 3 : GRIS */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border border-border ring-4 ring-card z-10">
                            3
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-base text-foreground">{t('step3_title')}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {t('step3_desc')}
                            </p>
                        </div>
                    </div>

                    {/* ÉTAPE 4 : GRIS */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm border border-border ring-4 ring-card z-10">
                            4
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-base text-foreground">{t('step4_title')}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {t('step4_desc')}
                            </p>
                        </div>
                    </div>

                    {/* ÉTAPE 5 : MAISON (ICÔNE) */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border ring-4 ring-card z-10">
                            <Home className="h-4 w-4" />
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-base text-foreground">{t('step5_title')}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {t('step5_desc')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}