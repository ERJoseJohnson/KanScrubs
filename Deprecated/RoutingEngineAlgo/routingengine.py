import numpy as np
import random as rd

CONST_TOTAL = 15

# customerMatrix = np.array[0]  # N-by-
agentMatrix = 0
matchedMatrix = []

# customerInsuranceStack = [0]*CONST_TOTAL
# agentInsuranceList = [0]*CONST_TOTAL
# customerCreditStack = [0]*CONST_TOTAL
# agentCreditList = [0]*CONST_TOTAL
# customerCardStack = [0]*CONST_TOTAL
# agentCardStack = [0]*CONST_TOTAL
# customerMortgageStack = [0]*CONST_TOTAL
# agentMortgageList = [0]*CONST_TOTAL
# customerGeneralStack = [0]*CONST_TOTAL
# agentGeneralList = [0]*CONST_TOTAL

customerInsuranceStack = []
agentInsuranceList = []
customerCreditStack = []
agentCreditList = []
customerCardStack = []
agentCardStack = []
customerMortgageStack = []
agentMortgageList = []
customerGeneralStack = []
agentGeneralList = []

# queryAgentsOccupied = {'agentGeneralList': False, 'agentMortgageList':False,'agentCardStack':False, 'agentCreditList':False, 'agentInsuranceList':False}

dictOfDataStructs = {'0': customerGeneralStack, '1': agentGeneralList, '2': customerMortgageStack, '3': agentMortgageList, '4': customerCardStack,
                     '5': agentCardStack, '6': customerCreditStack, '7': agentCreditList, '8': customerInsuranceStack, '9': agentInsuranceList}


def createEnvironCustomerToAgent(customerStack, agentList):
    # Send customerID and agentID to initialise a chat interface
    return 1


def matchCustomertoAgent(customerStack, agentList):
    # Match agents in agentList to customers in cuatomerStack
    # Update database to reflect the status of the agents and the customer
    matchedPair = [customerStack[0], agentList[0]]
    customerStack.pop(0)
    agentList.pop(0)
    matchedMatrix.append(matchedPair)
    print("matched " + matchedPair[0] + " customer to " +
          matchedPair[1] + " agent successfully")


def checkIfAgentsAvailable(agentList, agentListNo):
    # If all agents unavailable, no need to process.
    if len(agentList) == 0:
        print("The agents from this list are busy")

        return False
    else:
        print("Okay to go for this list")
        return True


def checkIfCustomersAvailable(customerStack):
    if len(customerStack) == 0:
        print("No customers for this query")
        return False
    else:
        print("Good to go for this list")
        return True


def updateArraysFromDatabase():
    return 0


def initialiseArrays():
    return 0


def main():
    x = 0
    for x in range(40):
        y = str(rd.randint(0, 9))
        dictOfDataStructs[y].append(x)
    # for lists in dictOfDataStructs.values():
    #     print(lists)


main()
