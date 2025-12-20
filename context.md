# Jobes - Personal Job Tracker Dashboard

## Overview

Jobes is a personal job tracker dashboard designed to centralize and streamline the job search process. It serves as a single source of truth for managing job opportunities, professional contacts, and application progress.

## Core Features

### Company Directory

A curated collection of companies the user is interested in. Each company entry can include:

- Company name and basic information
- Notes about why the company is interesting
- Links to company career pages or job listings

### Contact Management

A CRM-style system for tracking professional connections within target companies:

- Contact names and roles (e.g., Engineering Manager, Recruiter)
- LinkedIn profiles and other social links
- Notes about interactions or referral potential

### Application Tracker

A comprehensive log of all job applications submitted:

- Position and company details
- Application date and current status (e.g., Applied, Screening, Interview, Offer, Rejected)
- Notes and follow-up reminders
- Timeline of status changes

### Job Search Toolkit

A collection of useful resources and tools for the job search:

- CV/Resume builder or links to preferred tools
- ATS (Applicant Tracking System) checker tools
- Curated list of job board links
- Other helpful resources

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Components**: shadcn/ui
- **Runtime**: Bun

## Storage

For now, this will be stored in localStorage. However, we want to abstract out features in their corresponding services, with methods like "createCompany" or "createPerson", so that in the future we can edit these methods directly when we add database storage.

## Project Status

This project is in early development. Features will be built incrementally.
