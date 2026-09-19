import HelpHeader from "@/components/help/HelpHeader";
import SearchHelp from "@/components/help/SearchHelp";
import HelpCategories from "@/components/help/HelpCategories";
import FAQ from "@/components/help/FAQ";
import ContactSupport from "@/components/help/ContactSupport";
import SupportCard from "@/components/help/SupportCard";
import HelpArticles from "@/components/help/HelpArticles";
import HelpVideoCard from "@/components/help/HelpVideoCard";
import TicketStatus from "@/components/help/TicketStatus";

export default function HelpPage() {
  return (
    <div className="space-y-8">

      <HelpHeader />

      <SearchHelp />

      <HelpCategories />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="space-y-8 xl:col-span-2">

          <FAQ />

          <HelpArticles />

          <ContactSupport />

          <TicketStatus />

        </div>

        <div className="space-y-8">

          <SupportCard />

          <HelpVideoCard />

        </div>

      </div>

    </div>
  );
}