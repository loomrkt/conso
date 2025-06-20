'use client';
import { useRemoteComponent } from '@/hooks/useRemoteComponent';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const DynamicModeToggle = useRemoteComponent('ModeToggle', {
    Button,
    Sun,
    Moon,
    useTheme
  });

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Theme Toggle</h1>
      
      {DynamicModeToggle ? (
        <DynamicModeToggle />
      ) : (
        <p>Loading theme toggle...</p>
      )}
    </div>
  );
}