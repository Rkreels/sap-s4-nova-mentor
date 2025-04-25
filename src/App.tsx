
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
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
            <Route path="manufacturing" element={<Index />} />
            <Route path="procurement" element={<Index />} />
            <Route path="project-management" element={<Index />} />
            <Route path="sales" element={<Index />} />
            <Route path="other" element={<Index />} />
            <Route path="trial-center" element={<Index />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
