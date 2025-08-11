import { useQueryClient } from "@tanstack/react-query";
import SupplyChainTimeline from "./SupplyChainTimeline";
import RecentShipments from "./RecentShipments";
import WalkthroughDemo from "./WalkthroughDemo";

export default function SupplyChainDashboard() {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["recentShipments"] });
  };

  return (
    <div>
      <SupplyChainTimeline onSuccess={handleSuccess} />
      <RecentShipments limit={20} />
      <div id="walkthrough" className="scroll-mt-24">
        <WalkthroughDemo />
      </div>
    </div>
  );
}
