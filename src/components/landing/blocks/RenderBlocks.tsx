import type { Page } from "@/payload-types";
import React from "react";
import { HeroBlock } from "./home/HeroBlock";
import { AboutHeroBlock } from "./about/AboutHeroBlock";
import { AboutWhoWeAreBlock } from "./about/AboutWhoWeAreBlock";
import { AboutOurDifferenceBlock } from "./about/AboutOurDifferenceBlock";
import { AboutHowWeWorkBlock } from "./about/AboutHowWeWorkBlock";
import { AboutWaysBlock } from "./about/AboutWaysBlock";
import { AboutTeamMembersBlock } from "./about/AboutTeamMembersBlock";
import { IndustriesBlock } from "./common/IndustriesBlock";
import { ServicesMainSectionBlock } from "./services/ServicesMainSectionBlock";
import { CommonCtaBlock } from "./common/CommonCtaBlock";
import { DirectoryBlock } from "./services/DirectoryBlock";
import { SubservicesBlock } from "./services/SubservicesBlock";
import { WhenYouNeedItBlock } from "./services/WhenYouNeedItBlock";
import { ReadinessCheckBlock } from "./services/ReadinessCheckBlock";
import { ContactWhatWeDeliverBlock } from "./common/ContactWhatWeDeliverBlock";
import { ProjectPrinciplesBlock } from "./projects/ProjectPrinciplesBlock";
import { ProjectValueBlock } from "./projects/ProjectValueBlock";
import { ProjectCtaBlock } from "./projects/ProjectCtaBlock";
import { ProjectBuiltForBlock } from "./projects/ProjectBuiltForBlock";
import { ProjectTextBlockBlock } from "./projects/ProjectTextBlockBlock";
import { ProjectWhatComesNextBlock } from "./projects/ProjectWhatComesNextBlock";
import { SubservicePipelineBlock } from "./services/SubservicePipelineBlock";
import { SubserviceFeaturesAndStepsBlock } from "./services/SubserviceFeaturesAndStepsBlock";
import { SubserviceCapabilitiesUseCasesBlock } from "./services/SubserviceCapabilitiesUseCasesBlock";
import { SubserviceTextAndTagsBlock } from "./services/SubserviceTextAndTagsBlock";
import { SubserviceDeliverablesBlock } from "./services/SubserviceDeliverablesBlock";
import { HeroMarqueeBlock } from "./common/HeroMarqueeBlock";
import { HomeAboutBlock } from "./home/HomeAboutBlock";
import { HomeCapabilities } from "./home/HomeCapabilities";
import { HomeProjects } from "./home/HomeProjects";
import { HomeTechnologies } from "./home/HomeTechnologies";
import { HomeFAQ } from "./home/HomeFAQ";
import { HomeBlogsSection } from "./home/HomeBlogsSection";
import { FeaturedPostBlock } from "./home/FeaturedPostBlock";
import { RelatedPostsBlock } from "./home/RelatedPostsBlock";
import { ContactFormBlock } from "./common/ContactFormBlock";
import { SubscribeToNewsletterBlock } from "./common/SubscribeToNewsletterBlock";
import { MarqueeIconsBlock } from "./common/MarqueeIconsBlock";
import { HighlightedTitleAndEyebrowBlock } from "./common/HighlightedTitleAndEyebrowBlock";

/**
 * Props for the RenderBlocks component.
 */
type Props = {
  /** An array of blocks to render, derived from the Page layout field in Payload */
  blocks: Page["layout"];
};

/**
 * A layout renderer that maps over an array of Payload blocks and renders
 * the corresponding React components.
 */
export const RenderBlocks: React.FC<Props> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/30">
          <p className="text-muted-foreground">
            This page has no content blocks yet. Add some in the Payload Admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const key = block.id || `${block.blockType}-${index}`;

        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={key} {...block} />;
          case "about-hero":
            return <AboutHeroBlock key={key} {...block} />;
          case "about-who-we-are":
            return <AboutWhoWeAreBlock key={key} {...block} />;
          case "about-our-difference":
            return <AboutOurDifferenceBlock key={key} {...block} />;
          case "about-how-we-work":
            return <AboutHowWeWorkBlock key={key} {...block} />;
          case "about-ways":
            return <AboutWaysBlock key={key} {...block} />;
          case "about-team-members":
            return <AboutTeamMembersBlock key={key} {...block} />;
          case "industries":
            return <IndustriesBlock key={key} {...block} />;
          case "services-main-section":
            return <ServicesMainSectionBlock key={key} {...block} />;
          case "common-cta":
            return <CommonCtaBlock key={key} {...block} />;
          case "directory":
            return <DirectoryBlock key={key} {...block} />;
          case "subservices":
            return <SubservicesBlock key={key} {...block} />;
          case "when-you-need-it":
            return <WhenYouNeedItBlock key={key} {...block} />;
          case "readiness-check":
            return <ReadinessCheckBlock key={key} {...block} />;
          case "contact-what-we-deliver":
            return <ContactWhatWeDeliverBlock key={key} {...block} />;

          case "project-principles":
            return <ProjectPrinciplesBlock key={key} {...block} />;
          case "project-value":
            return <ProjectValueBlock key={key} {...block} />;
          case "project-cta":
            return <ProjectCtaBlock key={key} {...block} />;
          case "project-built-for":
            return <ProjectBuiltForBlock key={key} {...block} />;
          case "project-text-block":
            return <ProjectTextBlockBlock key={key} {...block} />;
          case "project-what-comes-next":
            return <ProjectWhatComesNextBlock key={key} {...block} />;
          case "subservice-pipeline":
            return <SubservicePipelineBlock key={key} {...block} />;
          case "subservice-features-steps":
            return <SubserviceFeaturesAndStepsBlock key={key} {...block} />;
          case "subservice-use-cases":
            return <SubserviceCapabilitiesUseCasesBlock key={key} {...block} />;
          case "subservice-text-and-tags":
            return <SubserviceTextAndTagsBlock key={key} {...block} />;
          case "subservice-deliverables":
            return <SubserviceDeliverablesBlock key={key} {...block} />;
          case "clip-text-marquee":
            return <HeroMarqueeBlock key={key} {...block} />;
          case "home-about":
            return <HomeAboutBlock key={key} {...block} />;
          case "capabilities":
            return <HomeCapabilities key={key} {...block} />;
          case "projects":
            return <HomeProjects key={key} {...block} />;
          case "technologies":
            return <HomeTechnologies key={key} {...block} />;
          case "faq":
            return <HomeFAQ key={key} {...block} />;
          case "home-blogs":
            return <HomeBlogsSection key={key} {...block} />;
          case "featured-post":
            return <FeaturedPostBlock key={key} {...block} />;
          case "related-posts":
            return <RelatedPostsBlock key={key} {...block} />;
          case "contact-form":
            return <ContactFormBlock key={key} {...block} />;
          case "subscribe-to-newsletter":
            return <SubscribeToNewsletterBlock key={key} {...block} />;
          case "marquee-icons":
            return <MarqueeIconsBlock key={key} {...block} />;
          case "highlighted-title-and-eyebrow":
            return <HighlightedTitleAndEyebrowBlock key={key} {...block} />;

          default:
            return (
              <section key={key} className="container mx-auto py-12 px-4">
                <div className="p-8 border-2 border-dashed rounded-lg bg-destructive/5 text-destructive text-center">
                  <p className="font-semibold">Missing Component Mapping</p>
                  <p className="text-sm opacity-80">
                    No React component found for block type:{" "}
                    <code>{(block as { blockType: string }).blockType}</code>
                  </p>
                </div>
              </section>
            );
        }
      })}
    </div>
  );
};
