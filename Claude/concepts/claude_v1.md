Anthropic: 
    --> claude.ai (chat)
    --> claude cowork
    --> cladue code
    --> API (Developers)

claude.ai:
    chatgpt
    documentation(pdf, excel...)

claude cowork:
    with simple prompt we can do any task without knowledge.
    it will  schedule all tasks.
    Destop.
    Agentic software

cladue code:
    Develper tool(till setup)
    work as cli(python) 
    best coding assistent

API:
    LLM


Claude cowork:
    It is develped in 10 days using claude code.
    1) Skills
    2) Connectors
    3) Plugins(MCp)
    4) Task(Job)
    5) Microsoft

Architecture of cluade cowork:

Desktop: Claude Desktop APP
    co-work(TAB) -> VM sandbox
        Files access(Read/write)
        1) Skills
        2) Connectors
        3) Plugins(MCp)
        4) Task(Job)
        5) Microsoft
        6) chrome in claude
        7) sub agents
        outputd
TASK:
    1) Input
    2) Plan(Task, tools, Info)
    3) Breaks into sub task
    4) Sub agents execute
    5) Results

Dont give full lap access.
only needs to give particular access.

Skills: 
    1) in google--> claude skills github
    2) no need to add anthropics/skills because this was already there, so add some others
    3) open the github inside we have multiple skills -> choose any one --> copy the url
    4) download-directory.github.io
    5) download one zip file
    6)  in sidebar click Customize
    7) click skills
    8) click + icon
    9) add the zip files


Frameworks:
    1) RTCFR - normal text generation
    2) CRISP - agent activities
        C - context( Background, Business)
        R - Role (BA, AI engineer)
        I - Instructions (Find the last month sales details)
        S - Scope/constraints (foucs on particular thing, like excel focus sheet1, Last 3 days)
        P - Output format(10dect, white and black theme)

Claude cowork in chrome:
    claude will take complete access of chrome.
    capcha(wont be bypass)
    steps
        1) settings
        2) connectors
        3) claude in chrome - connect
        4) in below: configure -> enable
        5) click general
            browser use and computer use -- enable 
        6) click + icon in chat
        7) enable claude cowork in chrome
    capabilities:
        1) it can fill any forms(like booking car)
        2) data extraction - we can get research data
        3) multi tab search
        4) scroll and paginate
        5) click and navigate
        6) it can read page


Claude chat:
    1) Intro (web, Desktop, mobile) -> pricing
    2) Prompt in claude
    3) Memory
    4) Projects
    5) Artifacts
    6) Voice of Tips

Prompt writting:
    1) Be specific
    2) Give context
    3) Ask for format( like, bullet points, 5list)

Memory:
    No need to introduce everytime.
    settings--> capablities --> Enable (Generate memory from chat history)

projects:
    new project
    name and description
    instruction

Artifacts:



claude code: 

    Step 1: Prerequisites
    Install Node.js (v18 or later).
    Create a Claude account (Pro, Max, Team, Enterprise, or supported API access).
    Install Git (recommended for most development projects).
    Step 2: Install Claude Code
    Windows (PowerShell)
    irm https://claude.ai/install.ps1 | iex
    macOS / Linux
    curl -fsSL https://claude.ai/install.sh | bash

    Or install with npm:

    npm install -g @anthropic-ai/claude-code

    Verify the installation:

    claude --version

    Avoid using sudo with the npm installation to prevent permission issues.

    Step 3: Login

    Open a terminal and run:

    claude

    Then:

    /login

    A browser opens → Sign in → Return to the terminal.

    Step 4: Open Your Project

    Navigate to your project:

    cd MyJavaProject

    Start Claude Code:

    claude

    Claude now understands your project's files.

    Step 5: Ask Simple Prompts

    Examples:

    Explain this project.
    Find bugs in this code.
    Create a Login API.
    Refactor this class.
    Write JUnit tests.
    Explain this exception.
    Step 6: Create CLAUDE.md

    Inside your project:

    MyProject/
    │
    ├── CLAUDE.md
    ├── src/
    └── pom.xml

    Example:

    # Project Rules

    - Use Java 21
    - Spring Boot 3
    - Follow SOLID principles
    - Write JUnit 5 tests
    - Explain code before changing it

    Claude automatically follows these project instructions.

    Step 7: Everyday Workflow
    1. Open Terminal
    2. cd MyProject
    3. claude
    4. Ask your task
    5. Review changes
    6. Approve or reject edits
    7. Test your project
    8. Commit to Git
    Beginner Prompts
    Understand code
    Explain this project like I'm a beginner.
    Add a feature
    Add JWT authentication.
    Fix errors
    Fix all compilation errors.
    Improve code
    Refactor this code using SOLID principles.
    Learn
    Teach me how this code works step by step.
    Generate tests
    Write JUnit tests for UserService.
    Review code
    Review my code and suggest improvements.
    Daily Development Routine
    Open your project.
    Run claude.
    Describe what you want in plain English.
    Review the proposed changes.
    Test the application.
    Commit your changes to Git.
    Best Practices
    ✅ Keep a CLAUDE.md file with your project rules.
    ✅ Ask for one feature or change at a time.
    ✅ Review every code change before accepting it.
    ✅ Run your tests after Claude makes changes.
    ✅ Use Git so you can easily revert if needed.