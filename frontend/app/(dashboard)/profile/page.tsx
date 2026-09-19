import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ChangePassword from "@/components/profile/ChangePassword";
import ProfileActivity from "@/components/profile/ProfileActivity";

export default function ProfilePage() {
  return (
    <div className="space-y-8">

      <ProfileHeader />

      <ProfileStats />

      <div className="grid gap-8 xl:grid-cols-3">

        <ProfileCard />

        <div className="space-y-8 xl:col-span-2">

          <ProfileDetails />

          <ChangePassword />

          <ProfileActivity />

        </div>

      </div>

    </div>
  );
}