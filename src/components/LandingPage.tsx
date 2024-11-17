"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Globe,
  Smartphone,
  Zap,
  Menu,
  Sun,
  Moon,
  Laptop,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Theme = "light" | "dark" | "system";

const EnhancedLandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const features = [
    {
      title: "Web Applications",
      icon: <Code className="h-8 w-8 text-primary" />,
      description: "Custom web applications tailored to your business needs",
      details: "Full-stack solutions with modern frameworks",
    },
    {
      title: "Websites",
      icon: <Globe className="h-8 w-8 text-primary" />,
      description: "Beautiful, responsive websites that drive results",
      details: "SEO-optimized and mobile-first approach",
    },
    {
      title: "Mobile Apps",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      description: "Native and cross-platform mobile applications",
      details: "iOS and Android development expertise",
    },
    {
      title: "Fast Delivery",
      icon: <Zap className="h-8 w-8 text-primary" />,
      description: "Quick turnaround without compromising quality",
      details: "Agile development methodology",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.a
              href="/"
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary">Code</span>Dreamers
            </motion.a>

            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="/"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="#services"
                    >
                      Services
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                              to="/Invoice-generator"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Invoice Generator
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Create professional invoices quickly and easily.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">
                                More Products
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Explore our other innovative solutions.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      href="#contact"
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <a href="/" className="w-full">
                      Home
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#services" className="w-full">
                      Services
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/Invoice-generator" className="w-full">
                      Invoice Generator
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#contact" className="w-full">
                      Contact
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/95 overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-white/10 dark:bg-grid-black/10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block">Transform Your Ideas Into</span>
              <span className="block text-primary">Digital Reality</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We craft exceptional software solutions that help businesses and
              individuals thrive in the digital age.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="text-lg group bg-primary hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="currentColor"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {feature.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5" />
        <motion.div
          className="container relative mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 text-muted-foreground text-center">
              Let's turn your vision into reality together. Our team is ready to
              help you build something amazing.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </Label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </Label>
                <Textarea id="message" name="message" rows={4} required />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="text-lg group bg-primary hover:bg-primary/90"
                >
                  Send Message
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">
                <span className="text-primary">Code</span>Dreamers
              </h3>
              <p className="text-sm text-muted-foreground">
                Transforming ideas into digital reality since 2024
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Web Applications</li>
                <li>Mobile Development</li>
                <li>UI/UX Design</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 CodeDreamers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;
