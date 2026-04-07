@good-memory
Feature: Upload a good moment to memory book
  As a user of The Grief App
  I want to add a good moment entry with a photo
  So that I can record positive experiences during my grief journey

  Scenario: Successfully add a good moment entry with a photo
    Given I am on the Memory Book screen
    When I tap the "Good moments" tab
    And I tap "Add a good moment"
    And I tap the picture icon on the good moment screen
    And I select the first image from the gallery
    And I enter "A cherished moment" as the moment text
    And I save the good moment
    Then I am returned to the Memory Book screen
