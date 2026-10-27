import React, { useState } from 'react';
import { Phone, Calendar, MessageSquare } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { TrustNumbers } from './components/landing/TrustNumbers';
import { RoomsSection } from './components/landing/RoomsSection';
import { ServicesSection } from './components/landing/ServicesSection';
import { CasesSection } from './components/landing/CasesSection';
import { TeamSection } from './components/landing/TeamSection';
import { HowWeWorkSection } from './components/landing/HowWeWorkSection';
import { ReviewsSection } from './components/landing/ReviewsSection';
import { CredentialsSection } from './components/landing/CredentialsSection';
import { FaqSection } from './components/landing/FaqSection';
import { QuizLeadMagnet } from './components/landing/QuizLeadMagnet';
import { GallerySection } from './components/landing/GallerySection';
import { LocationSection } from './components/landing/LocationSection';
import { BookingSection } from './components/landing/BookingSection';
import { Footer } from './components/layout/Footer';

// Modals
import { RoomDetailModal } from './components/modals/RoomDetailModal';
import { LegalModal } from './components/modals/LegalModal';

import { Room, HOTEL_INFO } from './data/hotelData';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Booking states
  const [bookingRoomType, setBookingRoomType] = useState<string>('single');
  const [bookingDates, setBookingDates] = useState<{ checkIn: string; checkOut: string; guests: number } | undefined>(undefined);
  const [bookingNote, setBookingNote] = useState<string>('');

  const handleOpenBooking = (roomType?: string, dates?: { checkIn: string; checkOut: string; guests: number }) => {
    if (roomType) setBookingRoomType(roomType);
    if (dates) setBookingDates(dates);

    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyQuizRecommendation = (roomType: string, bonusNote: string) => {
    setBookingRoomType(roomType);
    setBookingNote(bonusNote);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-900 text-stone-100 antialiased selection:bg-amber-500/20 selection:text-amber-300">
      {/* 3-Zone Top Bar Navbar with perfectly fitting mobile buttons */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* 1. Hero Block (No search, high-conversion offer + quick booking strip) */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* 2. Trust Numbers */}
        <TrustNumbers />

        {/* 3. Rooms and Pricing */}
        <RoomsSection
          onOpenBooking={handleOpenBooking}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* 4. Guest Cases / Scenarios */}
        <CasesSection onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Team & Hospitality Standards */}
        <TeamSection />

        {/* 6. How We Work (4 Simple Steps) */}
        <HowWeWorkSection onOpenBooking={() => handleOpenBooking()} />

        {/* 7. Services & Inclusions */}
        <ServicesSection onOpenBooking={() => handleOpenBooking()} />

        {/* 8. 2GIS Reviews (Rating 4.9) */}
        <ReviewsSection />

        {/* 9. Credentials & Legal Trust */}
        <CredentialsSection />

        {/* 10. FAQ Accordion */}
        <FaqSection />

        {/* 11. Interactive Quiz / Lead Magnet */}
        <QuizLeadMagnet onApplyRoomRecommendation={handleApplyQuizRecommendation} />

        {/* 12. Real Photo Gallery with Lightbox */}
        <GallerySection />

        {/* 13. Location & Landmarks Map */}
        <LocationSection />

        {/* 14. Booking Lead Form (Name and Phone only, Telegram Bot integration) */}
        <BookingSection
          initialRoomType={bookingRoomType}
          initialDates={bookingDates}
          initialNote={bookingNote}
        />
      </main>

      {/* 15. Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Mobile Floating Sticky Action Bar (strictly under 15% viewport height cap) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 p-2 px-3 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={HOTEL_INFO.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href={`tel:${HOTEL_INFO.phoneClean}`}
          aria-label="Позвонить"
          className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 flex items-center justify-center shrink-0"
        >
          <Phone className="w-5 h-5 text-amber-400" />
        </a>

        <button
          type="button"
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 text-stone-950 shrink-0" />
          <span>Забронировать номер</span>
        </button>
      </div>

      {/* Modals */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBook={(roomId) => {
          setSelectedRoom(null);
          handleOpenBooking(roomId);
        }}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
