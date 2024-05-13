"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

const HistoryTab = ({ className }: any) => {
  return (
    <Card className={className}>
      <CardContent className="flex h-[100%] justify-center place-items-center">
        History Page
      </CardContent>
    </Card>
  );
};

export default HistoryTab;
