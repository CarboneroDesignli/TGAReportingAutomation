@journal
Feature: Record audio journal entry
  As a user of The Grief App
  I want to record an audio journal entry and save it with a custom title
  So that I can find and replay it from My recordings

  Scenario: Record, replace and try again, record again, save with title, verify in My recordings
    Given I am on the Journal screen
    When I tap the Record Audio tab
    And I record audio for 5 seconds
    And I tap Finish
    And I enter "This is a test" as the recording title
    And I tap Replace and try again
    And I record audio for 5 seconds
    And I tap Finish
    And I enter "This is a test" as the recording title
    And I save the recording
    Then I can see the recording in My recordings
    When I tap the saved recording
    Then I am on the recording detail screen
    When I go back from the recording
    And I navigate to Home
