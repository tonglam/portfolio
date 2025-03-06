# UI Components

This document provides an overview of the UI components available in the portfolio project, explaining their purpose, usage, and customization options.

## Component Organization

The UI components are organized in a hierarchical structure under the `app/components/` directory:

```
app/components/
├── ui/             # Low-level UI components
├── icons/          # Icon components
├── layout/         # Layout components
├── sections/       # Page section components
└── helpers/        # Helper components
```

## UI Components (`app/components/ui/`)

These are the foundational UI components that form the building blocks of the application interface. They are built on top of Radix UI primitives for accessibility and customized with Tailwind CSS.

### Button

A versatile button component with multiple variants and sizes.

**Usage:**

```tsx
import { Button } from '@/components/ui/button';

// Default button
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <Icons.plus className="mr-2 h-4 w-4" /> Add item
</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Loading state
<Button isLoading>Loading</Button>

// As a link
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### Card

A container component for displaying content in a card format.

**Usage:**

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>;
```

### Input

A text input component for forms.

**Usage:**

```tsx
import { Input } from '@/components/ui/input';

// Default input
<Input placeholder="Enter your name" />

// Disabled state
<Input disabled placeholder="Disabled input" />

// With label (using Form component)
import { Label } from '@/components/ui/label';

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

### Form

A form component built with React Hook Form for form state management and validation.

**Usage:**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define form schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

function ProfileForm() {
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Layout Components (`app/components/layout/`)

These components define the overall layout structure of the application.

### Navbar

The main navigation component displayed at the top of the application.

**Usage:**

```tsx
import { Navbar } from '@/components/layout/Navbar';

// In layout component
<div className="flex flex-col min-h-screen">
  <Navbar />
  <main className="flex-1">{children}</main>
</div>;
```

### Footer

The footer component displayed at the bottom of the application.

**Usage:**

```tsx
import { Footer } from '@/components/layout/Footer';

// In layout component
<div className="flex flex-col min-h-screen">
  <main className="flex-1">{children}</main>
  <Footer />
</div>;
```

## Section Components (`app/components/sections/`)

These components represent specific sections of pages, such as hero sections, feature sections, etc.

### Hero

The hero section typically displayed at the top of the home page.

**Usage:**

```tsx
import { Hero } from '@/components/sections/Hero';

// In page component
<div>
  <Hero
    title="Welcome to My Portfolio"
    description="I'm a full-stack developer specializing in React and Node.js"
    ctaText="View Projects"
    ctaLink="/projects"
  />
  {/* Other sections */}
</div>;
```

### Projects

A section for displaying project cards.

**Usage:**

```tsx
import { Projects } from '@/components/sections/Projects';
import { projects } from '@/data/projects';

// In page component
<div>
  <Projects
    title="My Projects"
    description="Here are some of the projects I've worked on"
    projects={projects}
  />
</div>;
```

### Contact

A contact form section.

**Usage:**

```tsx
import { Contact } from '@/components/sections/Contact';

// In page component
<div>
  <Contact
    title="Get in Touch"
    description="Have a question or want to work together? Send me a message!"
  />
</div>;
```

## Icon Components (`app/components/icons/`)

A collection of SVG icons used throughout the application.

**Usage:**

```tsx
import { Icons } from '@/components/icons';

// Using a specific icon
<Icons.github className="h-6 w-6" />;

// Using a dynamic icon
const iconName = 'github';
const DynamicIcon = Icons[iconName];

<DynamicIcon className="h-6 w-6" />;
```

## Helper Components (`app/components/helpers/`)

Utility components that provide specific functionality.

### BackToTopButton

A button that appears when scrolling down the page and allows users to scroll back to the top.

**Usage:**

```tsx
import { BackToTopButton } from '@/components/BackToTopButton';

// In layout component
<div>
  {children}
  <BackToTopButton />
</div>;
```

## Component Composition Patterns

The UI components are designed to be composed together to create complex interfaces. Here are some common composition patterns:

### Form with Multiple Fields

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(project => (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative overflow-hidden rounded-md">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map(tech => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={project.demoUrl} target="_blank">
            <Icons.externalLink className="mr-2 h-4 w-4" />
            Demo
          </Link>
        </Button>
        <Button asChild>
          <Link href={project.githubUrl} target="_blank">
            <Icons.github className="mr-2 h-4 w-4" />
            Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

## Styling Components

Components are styled using Tailwind CSS and can be customized using the following approaches:

### 1. Using className prop

Most components accept a `className` prop that can be used to add custom styles:

```tsx
<Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
  Gradient Button
</Button>
```

### 2. Using Variants

Many components support variants through the `cva` (class-variance-authority) library:

```tsx
// In button.tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Usage
<Button variant="outline" size="lg">
  Large Outline Button
</Button>;
```

### 3. Using Theme Variables

The project uses CSS variables for theming, which can be customized in the `globals.css` file:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Other theme variables */
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 1.2%;
  /* Other dark theme variables */
}
```

## Accessibility

All components are built with accessibility in mind, following these principles:

1. **Keyboard Navigation**: All interactive elements are focusable and can be activated using the keyboard.
2. **Screen Reader Support**: Components include appropriate ARIA attributes and roles.
3. **Color Contrast**: The color scheme meets WCAG AA standards for contrast.
4. **Focus Indicators**: Visible focus indicators are provided for keyboard users.

## Conclusion

This documentation provides an overview of the UI components available in the portfolio project. For more detailed information about specific components, refer to the component source code or the Radix UI documentation for the underlying primitives.
