export interface ClientProps {
  start: (classes?: any[]) => void;
  connectionUpdate: () => void;
  message: (classes: any[]) => void;
}


