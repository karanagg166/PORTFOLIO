declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "react-pdf" {
  export const Document: any;
  export const Page: any;
  export const pdfjs: any;
}


declare module "react-calendar-heatmap" {
  interface HeatmapProps {
    startDate: Date;
    endDate: Date;
    values: Array<{ date: string; count: number }>;
    classForValue: (value: any) => string;
    gutterSize: number;
  }
  
  const Heatmap: React.ComponentType<HeatmapProps>;
  export default Heatmap;
}

declare module "react-github-calendar" {
  interface GitHubCalendarProps {
    username: string;
    blockSize: number;
    blockMargin: number;
    color: string;
    fontSize: number;
  }
  
  const GitHubCalendar: React.ComponentType<GitHubCalendarProps>;
  export default GitHubCalendar;
}
