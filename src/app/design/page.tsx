"use client"
// PAGNES and AUTRES categories added — images to be added by user

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Monitor, Layers, Megaphone, CreditCard, Shirt, Camera, Star, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/components/provider/language-provider"

// ── Types ─────────────────────────────────────────────────────────────────
type DesignWork = {
    id: string
    category: string
    name: string
    nameFr: string
    year: string
    tools: string[]
    image: string
    en: { desc: string }
    fr: { desc: string }
}

// ── All design works ───────────────────────────────────────────────────────
const designWorks: DesignWork[] = [
    // ── UI/UX ──
    { id: "ui-cantiques", category: "UI/UX", name: "App Cantiques en Bamoun", nameFr: "App Cantiques en Bamoun", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/App cantiques en bamoun.png", en: { desc: "Mobile app UI for Bamoun cultural hymns — cultural preservation through technology." }, fr: { desc: "UI d'application mobile pour les cantiques en bamoun — préservation culturelle par la technologie." } },
    { id: "ui-elite", category: "UI/UX", name: "Elite App — E-Commerce", nameFr: "Elite App — E-Commerce", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/Elite app e-commerce.png", en: { desc: "Premium e-commerce mobile app UI with dark theme and elegant product displays." }, fr: { desc: "UI d'application e-commerce premium avec thème sombre et affichage élégant des produits." } },
    { id: "ui-elite2", category: "UI/UX", name: "Elite App — E-Commerce v2", nameFr: "Elite App — E-Commerce v2", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/Elite app e-commerce 2.png", en: { desc: "Second iteration of the Elite e-commerce app with refined product browsing." }, fr: { desc: "Deuxième itération de l'app Elite avec navigation produits affinée." } },
    { id: "ui-compagnon", category: "UI/UX", name: "Mon Compagnon — Student App", nameFr: "Mon Compagnon — App Étudiant", year: "2024", tools: ["Figma", "Flutter"], image: "/design/UI UX DESIGN/Mon compagnon - app d'aide etudiant.png", en: { desc: "Student companion app UI: schedule, notes, resources and deadline tracking." }, fr: { desc: "UI de l'application compagnon étudiant : emploi du temps, notes, ressources et délais." } },
    { id: "ui-ecolink", category: "UI/UX", name: "Ecolink — Eco App", nameFr: "Ecolink — App Écologique", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/ecolink - app ecologique.png", en: { desc: "Eco-conscious mobile app UI for environmental awareness and recycling." }, fr: { desc: "UI d'application mobile éco-responsable pour la sensibilisation environnementale." } },
    { id: "ui-ecolink2", category: "UI/UX", name: "Ecolink — Eco App v2", nameFr: "Ecolink — App Écologique v2", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/ecolink - app ecologique 2.png", en: { desc: "Second screen set of the Ecolink app with map and reporting features." }, fr: { desc: "Deuxième ensemble d'écrans de l'app Ecolink avec carte et signalement." } },
    { id: "ui-lexa", category: "UI/UX", name: "Lexa — Translation App", nameFr: "Lexa — App de Traduction", year: "2024", tools: ["Figma", "Flutter"], image: "/design/UI UX DESIGN/lexa - app de traduction.png", en: { desc: "Translation app UI with clean, minimal design and intuitive language switching." }, fr: { desc: "UI d'application de traduction avec design épuré et changement de langue intuitif." } },
    { id: "ui-vionime", category: "UI/UX", name: "Vionime — Anime Streaming", nameFr: "Vionime — Streaming Animés", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/Vionime - app de Straming d'animes.png", en: { desc: "Anime streaming platform UI with immersive dark design and rich media browsing." }, fr: { desc: "UI de plateforme de streaming d'animés avec design sombre immersif." } },
    { id: "ui-stream", category: "UI/UX", name: "Stream Web — Interface", nameFr: "Stream Web — Interface", year: "2024", tools: ["Figma"], image: "/design/UI UX DESIGN/stream web.png", en: { desc: "Web streaming platform interface with modern layout and content discovery." }, fr: { desc: "Interface de plateforme de streaming web avec mise en page moderne." } },

    // ── LOGOS & IDENTITÉ ──
    { id: "logo-camfoods", category: "LOGOS", name: "CAMFOODS — Logo", nameFr: "CAMFOODS — Logo", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/CAMFOODS.png", en: { desc: "Logo design for CAMFOODS, a Cameroonian food brand." }, fr: { desc: "Design de logo pour CAMFOODS, une marque alimentaire camerounaise." } },
    { id: "logo-dreamy", category: "LOGOS", name: "Dreamy — Logo", nameFr: "Dreamy — Logo", year: "2024", tools: ["Illustrator"], image: "/design/logos/Dreamy.png", en: { desc: "Elegant logo design for Dreamy brand." }, fr: { desc: "Design de logo élégant pour la marque Dreamy." } },
    { id: "logo-dreamy2", category: "LOGOS", name: "Dreamy — Logo v2", nameFr: "Dreamy — Logo v2", year: "2024", tools: ["Illustrator"], image: "/design/logos/Dreamy 2.png", en: { desc: "Second version of the Dreamy logo with refined typography." }, fr: { desc: "Deuxième version du logo Dreamy avec typographie affinée." } },
    { id: "logo-ae", category: "LOGOS", name: "AE 2024–2025 — Logo", nameFr: "AE 2024–2025 — Logo", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/LOGO AE 2024 2025.png", en: { desc: "Official logo for the Student Association 2024–2025." }, fr: { desc: "Logo officiel de l'Association des Étudiants 2024–2025." } },
    { id: "logo-clubgit", category: "LOGOS", name: "Club Git — Logo", nameFr: "Club Git — Logo", year: "2024", tools: ["Illustrator"], image: "/design/logos/LOGO CLUB GIT.png", en: { desc: "Logo for the Git Club at ENSPD university." }, fr: { desc: "Logo du Club Git à l'université ENSPD." } },
    { id: "logo-gitfoot", category: "LOGOS", name: "Git Foot Hackers — Logo", nameFr: "Git Foot Hackers — Logo", year: "2024", tools: ["Illustrator"], image: "/design/logos/LOGO GIT FOOT HACKERS.png", en: { desc: "Sports team logo for the Git Foot Hackers." }, fr: { desc: "Logo de l'équipe sportive Git Foot Hackers." } },
    { id: "logo-grossiste", category: "LOGOS", name: "Grossiste — Logo", nameFr: "Grossiste — Logo", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/LOGO GROSSISTE.png", en: { desc: "Wholesale business logo design." }, fr: { desc: "Design de logo pour une entreprise de gros." } },
    { id: "logo-stridenov", category: "LOGOS", name: "STRIDENOV — Logo", nameFr: "STRIDENOV — Logo", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/LOGO STRIDENOV.png", en: { desc: "Corporate logo design for STRIDENOV." }, fr: { desc: "Design de logo corporate pour STRIDENOV." } },
    { id: "logo-gwelamar", category: "LOGOS", name: "GWELAMAR SPA — Logo", nameFr: "GWELAMAR SPA — Logo", year: "2024", tools: ["Illustrator"], image: "/design/logos/Logo GWELAMAR SPA.png", en: { desc: "Luxury spa logo with elegant typography and botanical motifs." }, fr: { desc: "Logo de spa luxueux avec typographie élégante et motifs botaniques." } },
    { id: "logo-gwelamar2", category: "LOGOS", name: "GWELAMAR SPA — Logo v2", nameFr: "GWELAMAR SPA — Logo v2", year: "2024", tools: ["Illustrator"], image: "/design/logos/Logo GWELAMAR SPA 2.png", en: { desc: "Alternative version of the GWELAMAR SPA logo." }, fr: { desc: "Version alternative du logo GWELAMAR SPA." } },
    { id: "logo-hassimi", category: "LOGOS", name: "Hassimi Store — Logo", nameFr: "Hassimi Store — Logo", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/logo Hassimi store.png", en: { desc: "Brand logo for Hassimi Store retail business." }, fr: { desc: "Logo de marque pour le commerce de détail Hassimi Store." } },
    { id: "logo-hassimi-noel", category: "LOGOS", name: "Hassimi Store — Noël", nameFr: "Hassimi Store — Noël", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/logos/logo Hassimi store NOEL.png", en: { desc: "Christmas edition of the Hassimi Store logo." }, fr: { desc: "Édition de Noël du logo Hassimi Store." } },
    { id: "logo-ms", category: "LOGOS", name: "MS — Logo", nameFr: "MS — Logo", year: "2024", tools: ["Illustrator"], image: "/design/logos/logo MS.png", en: { desc: "Minimalist monogram logo for MS brand." }, fr: { desc: "Logo monogramme minimaliste pour la marque MS." } },
    { id: "logo-sie", category: "LOGOS", name: "SIE 2026 — Logo", nameFr: "SIE 2026 — Logo", year: "2025", tools: ["Illustrator"], image: "/design/logos/logo sie2026.png", en: { desc: "Official logo for SIE 2026 — Semaine de l'Innovation et de l'Entrepreneuriat." }, fr: { desc: "Logo officiel de la SIE 2026 — Semaine de l'Innovation et de l'Entrepreneuriat." } },

    // ── AFFICHES & ÉVÉNEMENTS ──
    { id: "aff-11fev", category: "AFFICHES", name: "11 Février 2025", nameFr: "11 Février 2025", year: "2025", tools: ["Photoshop", "CorelDraw"], image: "/design/11fev2025.png", en: { desc: "Event poster for February 11th national celebration." }, fr: { desc: "Affiche événementielle pour la célébration nationale du 11 février." } },
    { id: "aff-1ermai", category: "AFFICHES", name: "1er Mai 2025", nameFr: "1er Mai 2025", year: "2025", tools: ["Photoshop"], image: "/design/1ER MAI 2025.png", en: { desc: "Labour Day celebration poster with bold typography." }, fr: { desc: "Affiche de la fête du travail avec typographie audacieuse." } },
    { id: "aff-20mai", category: "AFFICHES", name: "20 Mai 2025", nameFr: "20 Mai 2025", year: "2025", tools: ["Photoshop"], image: "/design/20MAI2025.png", en: { desc: "National Day poster for Cameroon's May 20th celebration." }, fr: { desc: "Affiche de la fête nationale du 20 mai au Cameroun." } },
    { id: "aff-accueil", category: "AFFICHES", name: "Accueil des Nouveaux", nameFr: "Accueil des Nouveaux", year: "2024", tools: ["Photoshop", "Illustrator"], image: "/design/ACCEUIL DES NOUVEAUX.png", en: { desc: "Welcome event poster for new students at ENSPD." }, fr: { desc: "Affiche d'accueil des nouveaux étudiants à l'ENSPD." } },
    { id: "aff-accueil2", category: "AFFICHES", name: "Accueil des Nouveaux v2", nameFr: "Accueil des Nouveaux v2", year: "2024", tools: ["Photoshop", "Illustrator"], image: "/design/ACCEUIL DES NOUVEAUX 2.png", en: { desc: "Second version of the welcome poster for new students." }, fr: { desc: "Deuxième version de l'affiche d'accueil des nouveaux." } },
    { id: "aff-canton", category: "AFFICHES", name: "Canton Fair 2025 — KmerPay", nameFr: "Canton Fair 2025 — KmerPay", year: "2025", tools: ["Photoshop", "Illustrator"], image: "/design/CANTON FAIR 2025.png", en: { desc: "Trade fair promotional poster for KmerPay at Canton Fair 2025." }, fr: { desc: "Affiche promotionnelle pour KmerPay à la Foire de Canton 2025." } },
    { id: "aff-canton-k", category: "AFFICHES", name: "Canton Fair — KmerPay v2", nameFr: "Canton Fair — KmerPay v2", year: "2025", tools: ["Photoshop"], image: "/design/CANTON FAIR 2025 KMERPAY.png", en: { desc: "KmerPay branded version of the Canton Fair poster." }, fr: { desc: "Version KmerPay de l'affiche Canton Fair." } },
    { id: "aff-bourse", category: "AFFICHES", name: "Bourse Chine — KmerPay", nameFr: "Bourse Chine — KmerPay", year: "2025", tools: ["Photoshop"], image: "/design/BOURSE CHINE KMERPAY.png", en: { desc: "Scholarship opportunity announcement poster for KmerPay." }, fr: { desc: "Affiche d'annonce de bourse en Chine pour KmerPay." } },
    { id: "aff-foire", category: "AFFICHES", name: "Foire 2026 — KmerPay", nameFr: "Foire 2026 — KmerPay", year: "2025", tools: ["Photoshop"], image: "/design/FOIRE 2026 - KMERPAY.png", en: { desc: "2026 trade fair poster for KmerPay." }, fr: { desc: "Affiche de la foire 2026 pour KmerPay." } },
    { id: "aff-base", category: "AFFICHES", name: "Flyer Base Aérienne", nameFr: "Flyer Base Aérienne", year: "2024", tools: ["Photoshop"], image: "/design/FLYER A4 BASE AERIENNE.png", en: { desc: "A4 promotional flyer for an air base event." }, fr: { desc: "Flyer A4 promotionnel pour un événement de la base aérienne." } },
    { id: "aff-hassimi", category: "AFFICHES", name: "Flyers Hassimi Store", nameFr: "Flyers Hassimi Store", year: "2024", tools: ["Photoshop", "CorelDraw"], image: "/design/FLYERS HASSIMI.png", en: { desc: "Commercial flyers for Hassimi Store promotions." }, fr: { desc: "Flyers commerciaux pour les promotions du Hassimi Store." } },
    { id: "aff-rentree", category: "AFFICHES", name: "Rentrée Scolaire", nameFr: "Rentrée Scolaire", year: "2024", tools: ["Photoshop"], image: "/design/RENTREE SCOLAIRE.png", en: { desc: "Back-to-school promotional poster." }, fr: { desc: "Affiche promotionnelle pour la rentrée scolaire." } },
    { id: "aff-soutenance", category: "AFFICHES", name: "Service Soutenance — Club Git", nameFr: "Service Soutenance — Club Git", year: "2025", tools: ["Photoshop", "Illustrator"], image: "/design/SERVICE SOUTENANCE CLUB GIT.png", en: { desc: "Poster for the Git Club's thesis defense support service." }, fr: { desc: "Affiche pour le service de soutenance du Club Git." } },
    { id: "aff-soutenance2", category: "AFFICHES", name: "Service Soutenance v2", nameFr: "Service Soutenance v2", year: "2025", tools: ["Photoshop", "Illustrator"], image: "/design/SERVICE SOUTENANCE CLUB GIT2.png", en: { desc: "Second version of the thesis defense support poster." }, fr: { desc: "Deuxième version de l'affiche service soutenance." } },
    { id: "aff-eid", category: "AFFICHES", name: "Eid Mubarak", nameFr: "Eid Mubarak", year: "2024", tools: ["Photoshop"], image: "/design/EID MUBARAK.png", en: { desc: "Eid Mubarak celebration greeting design." }, fr: { desc: "Design de voeux pour la célébration de l'Aïd Moubarak." } },
    { id: "aff-paques", category: "AFFICHES", name: "Pâques", nameFr: "Pâques", year: "2024", tools: ["Photoshop"], image: "/design/PAQUES.png", en: { desc: "Easter celebration poster design." }, fr: { desc: "Design d'affiche pour la célébration de Pâques." } },
    { id: "aff-ramadan", category: "AFFICHES", name: "Ramadan Hassimi 2024", nameFr: "Ramadan Hassimi 2024", year: "2024", tools: ["Photoshop"], image: "/design/RAMADAM HASSIMI 2024.png", en: { desc: "Ramadan promotional design for Hassimi Store." }, fr: { desc: "Design promotionnel du Ramadan pour Hassimi Store." } },
    { id: "aff-salutations", category: "AFFICHES", name: "Salutations", nameFr: "Salutations", year: "2024", tools: ["Photoshop"], image: "/design/SALUTATIONS.png", en: { desc: "Greeting card design for various occasions." }, fr: { desc: "Design de carte de voeux pour diverses occasions." } },
    { id: "aff-rwanda", category: "AFFICHES", name: "Visit Rwanda", nameFr: "Visit Rwanda", year: "2024", tools: ["Photoshop"], image: "/design/VISIT RWANDA.png", en: { desc: "Tourism promotional design for Visit Rwanda campaign." }, fr: { desc: "Design promotionnel touristique pour la campagne Visit Rwanda." } },
    { id: "aff-delices", category: "AFFICHES", name: "Délices de Petra", nameFr: "Délices de Petra", year: "2024", tools: ["Photoshop"], image: "/design/DELICES DE PETRA.png", en: { desc: "Promotional poster for Délices de Petra restaurant." }, fr: { desc: "Affiche promotionnelle pour le restaurant Délices de Petra." } },
    { id: "aff-ms", category: "AFFICHES", name: "MS — Affiche", nameFr: "MS — Affiche", year: "2024", tools: ["Photoshop"], image: "/design/MS.png", en: { desc: "Promotional poster for MS brand." }, fr: { desc: "Affiche promotionnelle pour la marque MS." } },

    // ── CARTES & INVITATIONS ──
    { id: "carte-ae", category: "CARTES", name: "Carte AE 2025", nameFr: "Carte AE 2025", year: "2025", tools: ["Illustrator", "CorelDraw"], image: "/design/Carte AE 2025.png", en: { desc: "Student association membership card design for 2025." }, fr: { desc: "Design de carte de membre de l'association étudiante 2025." } },
    { id: "carte-mariage", category: "CARTES", name: "Faire-Part de Mariage", nameFr: "Faire-Part de Mariage", year: "2024", tools: ["Photoshop", "Illustrator"], image: "/design/Faire part mariage.png", en: { desc: "Elegant wedding invitation design." }, fr: { desc: "Design élégant de faire-part de mariage." } },
    { id: "carte-itineraire", category: "CARTES", name: "Itinéraire Voyage d'Étude", nameFr: "Itinéraire Voyage d'Étude", year: "2024", tools: ["Illustrator", "Photoshop"], image: "/design/ITINERAIRE VOYAGE D'ETUDE.png", en: { desc: "Study trip itinerary document design with maps and schedule layout." }, fr: { desc: "Design de document d'itinéraire de voyage d'étude avec cartes et planning." } },
    { id: "carte-calendrier", category: "CARTES", name: "Calendrier Hassimi Store", nameFr: "Calendrier Hassimi Store", year: "2024", tools: ["Photoshop", "CorelDraw"], image: "/design/Calendrier Hassimi store.png", en: { desc: "Custom branded calendar design for Hassimi Store." }, fr: { desc: "Design de calendrier personnalisé pour Hassimi Store." } },
    { id: "carte-cover", category: "CARTES", name: "Cover Page — Rapport", nameFr: "Cover Page — Rapport", year: "2024", tools: ["Photoshop", "Illustrator"], image: "/design/COVER PAGE.png", en: { desc: "Professional report cover page design." }, fr: { desc: "Design de page de couverture de rapport professionnel." } },
    { id: "carte-cover2", category: "CARTES", name: "Cover Page v2", nameFr: "Cover Page v2", year: "2024", tools: ["Photoshop", "Illustrator"], image: "/design/COVER PAGE 2.png", en: { desc: "Second version of the report cover page design." }, fr: { desc: "Deuxième version de la page de couverture de rapport." } },

    // ── ÉTIQUETTES & PACKAGING ──
    { id: "etiq-drusy", category: "ÉTIQUETTES", name: "Étiquette Drusy Fresh", nameFr: "Étiquette Drusy Fresh", year: "2024", tools: ["Illustrator", "CorelDraw"], image: "/design/ETIQUETTE DRUSY FRESH.png", en: { desc: "Product label design for Drusy Fresh brand." }, fr: { desc: "Design d'étiquette produit pour la marque Drusy Fresh." } },
    { id: "etiq-sourire", category: "ÉTIQUETTES", name: "Étiquette Mon Sourire Blanc", nameFr: "Étiquette Mon Sourire Blanc", year: "2024", tools: ["Illustrator"], image: "/design/ETIQUETTE MON SOURIRE BLANC.png", en: { desc: "Product label for Mon Sourire Blanc dental care brand." }, fr: { desc: "Étiquette produit pour la marque de soins dentaires Mon Sourire Blanc." } },
    { id: "etiq-bitakola", category: "ÉTIQUETTES", name: "Jus Bitakola — Étiquette", nameFr: "Jus Bitakola — Étiquette", year: "2024", tools: ["Illustrator"], image: "/design/etiquette jus bitakola.png", en: { desc: "Product label for Bitakola juice brand." }, fr: { desc: "Étiquette produit pour la marque de jus Bitakola." } },
    { id: "etiq-bag", category: "ÉTIQUETTES", name: "Shopping Bag Design", nameFr: "Design Sac Shopping", year: "2025", tools: ["Illustrator", "CorelDraw"], image: "/design/SHOPPING BAG.png", en: { desc: "Custom shopping bag design with brand identity." }, fr: { desc: "Design de sac shopping personnalisé avec identité de marque." } },
    { id: "etiq-banderole", category: "ÉTIQUETTES", name: "Banderole 1,90 × 1m", nameFr: "Banderole 1,90 × 1m", year: "2025", tools: ["Photoshop", "Illustrator"], image: "/design/BANDEROLE 1,90 x 1m.png", en: { desc: "Large format banner design for events and promotions." }, fr: { desc: "Design de banderole grand format pour événements et promotions." } },

    // ── TEXTILE & OBJETS ──
    { id: "textile-tshirt", category: "TEXTILE", name: "T-Shirt SIE 2026", nameFr: "T-Shirt SIE 2026", year: "2025", tools: ["Illustrator", "CorelDraw"], image: "/design/tshirts-polos/T-shirt sie2026.png", en: { desc: "Official SIE 2026 event t-shirt design." }, fr: { desc: "Design du t-shirt officiel de l'événement SIE 2026." } },
    { id: "textile-polo", category: "TEXTILE", name: "Polo Club Git", nameFr: "Polo Club Git", year: "2024", tools: ["Illustrator"], image: "/design/tshirts-polos/polo club git.png", en: { desc: "Official polo shirt design for the Git Club." }, fr: { desc: "Design du polo officiel du Club Git." } },

    // ── PAGNES ──
    // (images à ajouter dans public/design/pagnes/)

    // ── AUTRES ──
    // (images à ajouter dans public/design/autres/)

    // ── FILTRES & RÉSEAUX ──
    { id: "snap-01", category: "FILTRES", name: "Filtre Snap — 01", nameFr: "Filtre Snap — 01", year: "2024", tools: ["Photoshop", "Lens Studio"], image: "/design/filtre snap/POUR FILTRE SNAP 01.png", en: { desc: "Custom Snapchat filter for events and brand campaigns." }, fr: { desc: "Filtre Snapchat personnalisé pour événements et campagnes de marque." } },
    { id: "snap-02", category: "FILTRES", name: "Filtre Snap — 02", nameFr: "Filtre Snap — 02", year: "2024", tools: ["Photoshop", "Lens Studio"], image: "/design/filtre snap/POUR FILTRE SNAP 02.png", en: { desc: "Second Snapchat filter design for social media campaigns." }, fr: { desc: "Deuxième design de filtre Snapchat pour campagnes réseaux sociaux." } },
    { id: "snap-03", category: "FILTRES", name: "Filtre Snap — 03", nameFr: "Filtre Snap — 03", year: "2024", tools: ["Photoshop", "Lens Studio"], image: "/design/filtre snap/POUR FILTRE SNAP 03.png", en: { desc: "Third Snapchat filter in the series." }, fr: { desc: "Troisième filtre Snapchat de la série." } },
]

// ── SIE 2026 spotlight images ──────────────────────────────────────────────
const sieImages = [
    { id: "sie-logo", name: "Logo SIE 2026", image: "/design/logos/logo sie2026.png", desc: "Logo officiel de la SIE 2026" },
    { id: "sie-badges", name: "Badges SIE 2026", image: "/design/sie/BADGES SIE2026.png", desc: "Badges officiels pour les participants et intervenants" },
    { id: "sie-banderole", name: "Banderole", image: "/design/sie/BANDEROLE.png", desc: "Banderole d'entrée de l'événement" },
    { id: "sie-conference", name: "Conférence & Table Ronde", image: "/design/sie/CONFERENCE ET TABLE RONDE.png", desc: "Affiche de la conférence et table ronde" },
    { id: "sie-conf-ouv", name: "Conférence d'Ouverture", image: "/design/sie/CONFERENCE ouverture.png", desc: "Affiche de la conférence d'ouverture officielle" },
    { id: "sie-concours", name: "Concours de Projets", image: "/design/sie/Concours de projets.png", desc: "Affiche du concours de projets innovants" },
    { id: "sie-concours2", name: "Concours de Projets v2", image: "/design/sie/Concours de projets2.png", desc: "Deuxième affiche du concours de projets" },
    { id: "sie-concours3", name: "Concours de Projets v3", image: "/design/sie/Concours de projets3.png", desc: "Troisième affiche du concours de projets" },
    { id: "sie-dossier", name: "Dossier Marketing — Couverture", image: "/design/sie/DOSSIER MARKETING 1ER COUVERTURE.png", desc: "Première couverture du dossier marketing officiel" },
    { id: "sie-dossier4", name: "Dossier Marketing — 4ème Couv.", image: "/design/sie/Dossier Marketing Quatrieme de couverture.png", desc: "Quatrième de couverture du dossier marketing" },
    { id: "sie-claudel", name: "Dr Claudel Noubissie", image: "/design/sie/Dr claudel Noubissie sera la.png", desc: "Annonce de la présence du Dr Claudel Noubissie" },
    { id: "sie-gala-billet", name: "Gala — Billet", image: "/design/sie/GALA Billet.png", desc: "Design du billet officiel pour le Gala de clôture" },
    { id: "sie-gala-flyer", name: "Gala — Flyer", image: "/design/sie/GALA Flyer.png", desc: "Flyer promotionnel pour le Gala de clôture" },
    { id: "sie-gaming", name: "Journée Gaming", image: "/design/sie/JOURNEE GAMING.png", desc: "Affiche de la journée gaming et e-sport" },
    { id: "sie-miss1", name: "Miss Master", image: "/design/sie/MISS MASTER.png", desc: "Affiche du concours Miss Master" },
    { id: "sie-miss2", name: "Miss Master v2", image: "/design/sie/MISS MASTER 2.png", desc: "Deuxième affiche Miss Master" },
    { id: "sie-miss3", name: "Miss Master v3", image: "/design/sie/MISS MASTER 3.png", desc: "Troisième affiche Miss Master" },
    { id: "sie-programme", name: "Programme des Activités", image: "/design/sie/PROGRAMME DES ACTIVITES.png", desc: "Programme complet des activités de la semaine" },
    { id: "sie-stands", name: "Stands", image: "/design/sie/STANDS.png", desc: "Plan et design des stands d'exposition" },
    { id: "sie-tournoi", name: "Tournoi de l'Innovation", image: "/design/sie/TOURNOI DE L'INNOVATION.png", desc: "Affiche du tournoi de l'innovation" },
    { id: "sie-tournoi2", name: "Tournoi de l'Innovation v2", image: "/design/sie/TOURNOI DE L'INNOVATION 2.png", desc: "Deuxième affiche du tournoi de l'innovation" },
    { id: "sie-tournoi3", name: "Tournoi de l'Innovation v3", image: "/design/sie/TOURNOI DE L'INNOVATION3.png", desc: "Troisième affiche du tournoi de l'innovation" },
    { id: "sie-tshirt", name: "T-Shirt SIE 2026", image: "/design/tshirts-polos/T-shirt sie2026.png", desc: "T-shirt officiel de l'événement SIE 2026" },
]

// ── Categories config ──────────────────────────────────────────────────────
const categories = ["TOUT", "UI/UX", "LOGOS", "AFFICHES", "CARTES", "ÉTIQUETTES", "PAGNES", "TEXTILE", "FILTRES", "AUTRES"]

const categoryMeta: Record<string, { color: string; icon: React.ReactNode; fr: string; en: string }> = {
    "UI/UX": { color: "#3b82f6", icon: <Monitor size={13} />, fr: "Interfaces & expériences utilisateur", en: "Interfaces & user experiences" },
    "LOGOS": { color: "#a855f7", icon: <Layers size={13} />, fr: "Logos & identités visuelles", en: "Logos & visual identities" },
    "AFFICHES": { color: "#f59e0b", icon: <Megaphone size={13} />, fr: "Affiches, flyers & événements", en: "Posters, flyers & events" },
    "CARTES": { color: "#10b981", icon: <CreditCard size={13} />, fr: "Cartes, invitations & documents", en: "Cards, invitations & documents" },
    "ÉTIQUETTES": { color: "#ef4444", icon: <Camera size={13} />, fr: "Étiquettes, packaging & supports", en: "Labels, packaging & materials" },
    "PAGNES": { color: "#c2410c", icon: <Shirt size={13} />, fr: "Pagnes & textiles traditionnels", en: "Traditional fabrics & pagnes" },
    "TEXTILE": { color: "#f97316", icon: <Shirt size={13} />, fr: "T-shirts, polos & textile", en: "T-shirts, polos & textile" },
    "FILTRES": { color: "#06b6d4", icon: <Camera size={13} />, fr: "Filtres Snapchat & réseaux sociaux", en: "Snapchat filters & social media" },
    "AUTRES": { color: "#6b7280", icon: <Layers size={13} />, fr: "Autres créations & divers", en: "Other creations & miscellaneous" },
}

// ── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({ images, startIdx, onClose }: { images: { name: string; image: string; desc?: string }[]; startIdx: number; onClose: () => void }) {
    const [idx, setIdx] = useState(startIdx)
    const current = images[idx]
    const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
    const next = () => setIdx((i) => (i + 1) % images.length)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                className="relative max-w-4xl w-full flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors">
                    <X size={22} />
                </button>

                {/* Image */}
                <div className="relative w-full rounded-xl overflow-hidden" style={{ maxHeight: "75vh" }}>
                    <Image src={current.image} alt={current.name} width={1200} height={800} className="w-full h-auto object-contain" style={{ maxHeight: "75vh" }} />
                </div>

                {/* Caption */}
                <div className="text-center">
                    <p className="text-white font-semibold text-sm">{current.name}</p>
                    {current.desc && <p className="text-white/50 text-xs mt-0.5">{current.desc}</p>}
                    <p className="text-white/30 text-xs mt-1" style={{ fontFamily: "var(--font-mono)" }}>{idx + 1} / {images.length}</p>
                </div>

                {/* Nav */}
                {images.length > 1 && (
                    <div className="flex gap-3">
                        <button onClick={prev} className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={next} className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DesignPage() {
    const { lang } = useLanguage()
    const [activeCategory, setActiveCategory] = useState("TOUT")
    const [lightbox, setLightbox] = useState<{ images: { name: string; image: string; desc?: string }[]; idx: number } | null>(null)

    const filtered = activeCategory === "TOUT"
        ? designWorks
        : designWorks.filter((w) => w.category === activeCategory)

    const grouped = activeCategory === "TOUT"
        ? categories.slice(1).map((cat) => ({ cat, items: designWorks.filter((w) => w.category === cat) }))
        : [{ cat: activeCategory, items: filtered }]

    const openLightbox = (works: DesignWork[], idx: number) => {
        setLightbox({ images: works.map(w => ({ name: lang === "fr" ? w.nameFr : w.name, image: w.image })), idx })
    }

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <Header />

            <AnimatePresence>
                {lightbox && (
                    <Lightbox images={lightbox.images} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />
                )}
            </AnimatePresence>

            <div className="pt-24 pb-12 px-4 md:px-6 max-w-6xl mx-auto">

                {/* Back */}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                        <ArrowLeft size={13} />
                        {lang === "fr" ? "← Accueil" : "← Home"}
                    </Link>
                </motion.div>

                {/* Page header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-black mb-2" style={{ fontFamily: "var(--font-sans)", color: "var(--fg)" }}>
                        <span style={{ color: "var(--accent)" }}>{lang === "fr" ? "Réalisations " : "Design "}</span>
                        {lang === "fr" ? "Graphiques" : "Gallery"}
                    </h1>
                    <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                        {lang === "fr"
                            ? `${designWorks.length} créations — UI/UX, logos, affiches, cartes, étiquettes, textile et filtres.`
                            : `${designWorks.length} creations — UI/UX, logos, posters, cards, labels, textile and filters.`}
                    </p>
                </motion.div>

                {/* ── SIE 2026 SPOTLIGHT ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mb-12 rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(251,191,36,0.3)", background: "linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(245,158,11,0.08) 100%)" }}
                >
                    {/* Header */}
                    <div className="p-5 pb-4 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}>
                                <Star size={14} style={{ color: "#fbbf24" }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xs font-black tracking-widest" style={{ color: "#fbbf24", fontFamily: "var(--font-mono)" }}>ÉVÉNEMENT PHARE 2026</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                                        Direction Artistique Complète
                                    </span>
                                </div>
                                <h2 className="text-lg md:text-2xl font-black" style={{ color: "var(--fg)" }}>
                                    SIE 2026 — Semaine de l'Innovation et de l'Entrepreneuriat
                                </h2>
                                <p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                                    {lang === "fr"
                                        ? `Direction artistique complète de l'événement phare de l'ENSPD — ${sieImages.length} visuels : badges, affiches, billets, dossiers marketing, t-shirts et plus.`
                                        : `Complete art direction for ENSPD's flagship event — ${sieImages.length} visuals: badges, posters, tickets, marketing dossiers, t-shirts and more.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SIE Grid */}
                    <div className="px-5 pb-5">
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                            {sieImages.map((img, idx) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.02 }}
                                    className="group cursor-pointer rounded-lg overflow-hidden"
                                    style={{ border: "1px solid rgba(251,191,36,0.15)", aspectRatio: "3/4" }}
                                    onClick={() => setLightbox({ images: sieImages, idx })}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={img.image}
                                            alt={img.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 17vw"
                                        />
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-1.5"
                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }}>
                                            <p className="text-white text-[9px] font-semibold leading-tight line-clamp-2">{img.name}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-[10px] mt-3 text-center" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                            {lang === "fr" ? "Cliquez sur une image pour l'agrandir" : "Click any image to enlarge"} · {sieImages.length} visuels
                        </p>
                    </div>
                </motion.div>

                {/* ── Category filter ─────────────────────────────────────────────── */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="flex flex-wrap gap-2 mb-10">
                    {categories.map((cat) => {
                        const meta = categoryMeta[cat]
                        const count = cat === "TOUT" ? designWorks.length : designWorks.filter((w) => w.category === cat).length
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                                style={{
                                    background: activeCategory === cat ? (meta?.color ?? "var(--accent)") : "var(--bg-card)",
                                    color: activeCategory === cat ? "#fff" : "var(--fg-muted)",
                                    border: activeCategory === cat ? `1px solid ${meta?.color ?? "var(--accent)"}` : "1px solid var(--border)",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {meta && <span>{meta.icon}</span>}
                                {cat === "TOUT" ? (lang === "fr" ? "Tout" : "All") : cat}
                                <span className="opacity-60">({count})</span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* ── Gallery ─────────────────────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-14"
                    >
                        {grouped.map(({ cat, items }) => {
                            if (items.length === 0) return null
                            const meta = categoryMeta[cat]
                            return (
                                <div key={cat}>
                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-6 rounded-full" style={{ background: meta.color }} />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span style={{ color: meta.color }}>{meta.icon}</span>
                                                <h2 className="text-sm font-black tracking-widest" style={{ color: "var(--fg)" }}>{cat}</h2>
                                                <span className="text-xs" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>({items.length})</span>
                                            </div>
                                            <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                                                {lang === "fr" ? meta.fr : meta.en}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {items.map((work, idx) => {
                                            const content = lang === "fr" ? work.fr : work.en
                                            return (
                                                <motion.div
                                                    key={work.id}
                                                    initial={{ opacity: 0, scale: 0.97 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.03 }}
                                                    className="group rounded-xl overflow-hidden cursor-pointer"
                                                    style={{ border: "1px solid var(--border)" }}
                                                    onClick={() => openLightbox(items, idx)}
                                                >
                                                    {/* Image */}
                                                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                                                        <Image
                                                            src={work.image}
                                                            alt={lang === "fr" ? work.nameFr : work.name}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                                                        />
                                                        {/* Hover overlay */}
                                                        <div
                                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2"
                                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
                                                        >
                                                            <div className="w-full flex items-end justify-between">
                                                                <span className="text-white text-[10px] font-bold leading-tight flex-1 mr-1">{lang === "fr" ? work.nameFr : work.name}</span>
                                                                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                                                                    <ArrowUpRight size={10} className="text-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Year */}
                                                        <div className="absolute top-1.5 right-1.5">
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)", backdropFilter: "blur(4px)" }}>
                                                                {work.year}
                                                            </span>
                                                        </div>
                                                        {/* Category dot */}
                                                        <div className="absolute top-1.5 left-1.5">
                                                            <div className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
                                                        </div>
                                                    </div>

                                                    {/* Card body */}
                                                    <div className="p-2" style={{ background: "var(--bg-card)" }}>
                                                        <h3 className="font-bold text-[11px] mb-1 leading-tight" style={{ color: "var(--fg)" }}>
                                                            {lang === "fr" ? work.nameFr : work.name}
                                                        </h3>
                                                        <p className="text-[9px] leading-relaxed mb-1.5 line-clamp-2" style={{ color: "var(--fg-muted)" }}>
                                                            {content.desc}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {work.tools.map((tool) => (
                                                                <span key={tool} className="text-[8px] px-1 py-0.5 rounded" style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                                                                    {tool}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-14 pt-8 text-center"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <p className="text-sm mb-4" style={{ color: "var(--fg-muted)" }}>
                        {lang === "fr" ? "Vous avez un projet créatif en tête ?" : "Have a creative project in mind?"}
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium"
                        style={{ background: "var(--accent)", color: "#fff" }}
                    >
                        {lang === "fr" ? "Discutons-en" : "Let's talk"}
                        <ArrowUpRight size={14} />
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </main>
    )
}
