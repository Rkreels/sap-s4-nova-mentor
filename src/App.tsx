
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Manufacturing from "./pages/Manufacturing";
import Procurement from "./pages/Procurement";
import ProjectManagement from "./pages/ProjectManagement";
import Sales from "./pages/Sales";
import TrialCenter from "./pages/TrialCenter";
import NotFound from "./pages/NotFound";
import SAPLayout from "./components/SAPLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SAPLayout />}>
            <Route index element={<Index />} />
            <Route path="finance" element={<Finance />} />
            <Route path="manufacturing" element={<Manufacturing />} />
            <Route path="procurement" element={<Procurement />} />
            <Route path="project-management" element={<ProjectManagement />} />
            <Route path="sales" element={<Sales />} />
            <Route path="trial-center" element={<TrialCenter />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
