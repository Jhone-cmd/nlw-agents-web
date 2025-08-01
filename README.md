# NLW Agents

Projeto desenvolvido durante um evento da Rocketseat para demonstrar o uso de agentes inteligentes na web.

## 🚀 Tecnologias

- **React 19.1** - Biblioteca para interfaces de usuário
- **TypeScript 5.8** - Superset JavaScript com tipagem estática
- **Vite 7.0** - Build tool e servidor de desenvolvimento
- **TailwindCSS 4.1** - Framework CSS utility-first
- **React Router Dom 7.6** - Biblioteca de roteamento
- **TanStack React Query 5.8** - Gerenciamento de estado servidor e cache
- **Radix UI** - Componentes primitivos acessíveis
- **Shadcn/ui** - Sistema de componentes
- **Lucide React** - Biblioteca de ícones

## 📂 Padrões de Projeto

- **Component-based Architecture** - Arquitetura baseada em componentes React
- **File-based Routing** - Roteamento baseado em arquivos com React Router
- **Server State Management** - Gerenciamento de estado servidor com React Query
- **Variant-based Components** - Componentes com variantes usando CVA
- **Composition Pattern** - Padrão de composição com Radix Slot
- **Path Aliasing** - Alias de caminhos (`@/` aponta para `src/`)

## ⚙️ Configuração do Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

### Backend

O projeto consome uma API que deve estar rodando na porta 3333. Certifique-se de que o backend esteja configurado e executando antes de iniciar o frontend.

## 🛠️ Estrutura do Projeto

```
web/
├── public/                # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e ícones
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas principais (Home, Agents, Tasks, Login)
│   ├── hooks/             # Hooks customizados
│   ├── store/             # Zustand (estado global)
│   ├── services/          # Configuração do Axios e APIs
│   ├── styles/            # Arquivos de estilos (Tailwind)
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Ponto de entrada da aplicação
│   └── routes.tsx         # Definição das rotas
├── tsconfig.app.json      # Configuração TypeScript
├── vite.config.ts         # Configuração do Vite
├── eslint.config.js       # Configuração do ESLint
└── README.md              # Documentação do projeto
```