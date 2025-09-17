import React, { useState, useEffect, useRef } from "react";

// Componente Dialog principal
const Dialog = ({ open, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || !open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      {children}
    </div>
  );
};

// Componente DialogContent
const DialogContent = ({ children, className = "", onInteractOutside }) => {
  const contentRef = useRef(null);

  const handleClickOutside = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onInteractOutside?.();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

// Componente DialogHeader
const DialogHeader = ({ children, className = "" }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
  >
    {children}
  </div>
);

// Componente DialogFooter
const DialogFooter = ({ children, className = "" }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
  >
    {children}
  </div>
);

// Componente DialogTitle
const DialogTitle = ({ children, className = "" }) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h2>
);

// Componente DialogDescription
const DialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

// Componente DialogTrigger
const DialogTrigger = ({ children, asChild = false, onClick }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: (e) => {
        children.props.onClick?.(e);
        onClick?.(e);
      },
    });
  }

  return <button onClick={onClick}>{children}</button>;
};

// Componente DialogClose
const DialogClose = ({ children, asChild = false, onClick }) => {
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: (e) => {
        children.props.onClick?.(e);
        onClick?.(e);
      },
    });
  }

  return <button onClick={onClick}>{children}</button>;
};

// Hook personalizado para el estado del Dialog
const useDialog = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return {
    open,
    onOpenChange,
    setOpen,
  };
};

// Ejemplo de uso
const DialogDemo = () => {
  const { open, onOpenChange, setOpen } = useDialog();

  return (
    <div>
      <DialogTrigger onClick={() => setOpen(true)}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Abrir Dialog
        </button>
      </DialogTrigger>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Haz cambios en tu perfil aquí. Haz clic en guardar cuando
              termines.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nombre
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 border rounded p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Usuario
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3 border rounded p-2"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose onClick={() => setOpen(false)}>
              <button className="px-4 py-2 bg-gray-300 rounded mr-2">
                Cancelar
              </button>
            </DialogClose>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setOpen(false)}
            >
              Guardar cambios
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  //useDialog,
  DialogDemo,
};
