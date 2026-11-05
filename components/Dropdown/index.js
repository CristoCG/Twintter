import { useEffect, useRef, useState } from "react"
import { logout, resetDemo } from "lib/demoStore"
import { colors } from "styles/theme"

export default function Dropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [open])

  const handleReset = () => {
    if (
      window.confirm(
        "Se borrarán tus twintts, likes y usuario de esta demo. ¿Continuar?"
      )
    ) {
      resetDemo()
    }
  }

  return (
    <>
      <div className="dropdown" ref={ref}>
        <button
          className="dropbtn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Opciones"
        >
          ⋯
        </button>
        {open && (
          <div className="dropdown-content" role="menu">
            <button role="menuitem" onClick={logout}>
              Cerrar sesión
            </button>
            <button role="menuitem" className="danger" onClick={handleReset}>
              Reiniciar demo
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .dropdown {
          position: absolute;
          right: 16px;
          top: 16px;
        }
        .dropbtn {
          background-color: ${colors.secondary};
          border: none;
          border-radius: 999px;
          color: white;
          cursor: pointer;
          font-size: 20px;
          height: 40px;
          line-height: 1;
          width: 40px;
        }
        .dropbtn:hover,
        .dropbtn[aria-expanded="true"] {
          background-color: ${colors.primary};
        }
        .dropdown-content {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          margin-top: 6px;
          min-width: 170px;
          overflow: hidden;
          position: absolute;
          right: 0;
          z-index: 5;
        }
        .dropdown-content button {
          background: transparent;
          border: 0;
          color: #222;
          cursor: pointer;
          display: block;
          font-size: 15px;
          padding: 12px 16px;
          text-align: left;
          width: 100%;
        }
        .dropdown-content button:hover {
          background-color: #faf5ff;
        }
        .dropdown-content .danger {
          color: #e0245e;
        }
      `}</style>
    </>
  )
}
