@memory-book
Feature: Upload photo from gallery to memory book
  As a user of The Grief App
  I want to upload the first image from my gallery to a memory book entry
  So that I can preserve meaningful memories with photos

  Scenario: Successfully upload the first gallery image to a memory book entry
    Given I am on the Memory Book screen
    When I tap "Add to memory book"
    And I tap the photo upload button
    And I select the first image from the gallery
    And I enter "A cherished memory" as the description
    And I tap the Save button
    Then the memory book entry is saved successfully
