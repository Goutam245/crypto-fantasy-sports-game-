import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Trophy } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-grid-pattern flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-info flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-6xl font-display font-bold text-gradient-gold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
