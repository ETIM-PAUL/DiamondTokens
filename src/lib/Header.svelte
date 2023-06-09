<script>
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Input,
    Textarea,
    Modal,
  } from "flowbite-svelte";
  import { HandThumbDown, HandThumbUp } from "svelte-heros";
  import truncateEthAddress from "truncate-eth-address";

  import {
    approveDelegate,
    balanceOwner,
    delegateList,
    formatTimestamp,
    transferDiamondTokens,
    transferHistoryDetails,
  } from "../utils/utils";

  export let isWalletInstalled, connectWallet, loading, account, balance;

  let truncatedAccount = account === null ? null : truncateEthAddress(account);

  let defaultModal = false;

  let historyModal = false;

  let repModal = false;

  let repListModal = false;

  let loadingHistory = true;

  let transactionHistory = [];

  let delegates = [];

  // set amount
  let amount = null;

  // set receiver
  let _receiver = "";

  // set amount
  let delegateAmount = null;

  // set delegate
  let _delegate = "";

  // set transferState
  let loadingTransaction = false;

  // set approveDelegate state
  let loadingDelegate = false;

  // transferToken
  async function transferDiamond() {
    if (_receiver === "" || _receiver === undefined || _receiver === null) {
      alert("Please Enter Recipient Address");
    }
    if (amount === 0 || amount === null) {
      alert("Please Enter Amount of Tokens greater than 0");
    }
    const values = {
      _receiver,
      amount,
    };
    loadingTransaction = true;
    const result = await transferDiamondTokens(values, loadingTransaction);
    loadingTransaction = false;
    defaultModal = false;
  }

  // assign Delegate
  async function appointRep() {
    if (_delegate === "" || _delegate === undefined || _delegate === null) {
      alert("Please Enter Representative Address");
    }
    if (delegateAmount === 0 || delegateAmount === null) {
      alert("Please Enter Amount of Tokens greater than 0");
    }
    const values = {
      _delegate,
      delegateAmount,
    };
    loadingDelegate = true;
    const result = await approveDelegate(values, loadingTransaction);
    loadingDelegate = false;
    repModal = false;
  }

  // transaction history
  const getHistory = async () => {
    historyModal = true;
    if (truncatedAccount === null || truncatedAccount === undefined) {
      loadingHistory = false;
    } else {
      const result = await transferHistoryDetails();
      transactionHistory = result;
      loadingHistory = false;
    }
  };

  // delegates assigned
  const getDelegates = async () => {
    repListModal = true;
    if (truncatedAccount === null || truncatedAccount === undefined) {
      loadingDelegate = false;
    } else {
      const result = await delegateList();
      delegates = result;
      loadingDelegate = false;
    }
  };

  // hide modal
  function hideModal() {
    defaultModal = false;
    _receiver = "";
    amount = null;
  }

  // hide history modal
  function hideHistoryModal() {
    historyModal = false;
  }

  // hide delegate list modal
  function hideDelegatesModal() {
    repListModal = false;
  }

  let navClass =
    "bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800";
  let navDivClass =
    "flex flex-wrap justify-between items-center mx-auto max-w-screen-xl";
</script>

<header>
  <Navbar let:hidden let:toggle fluid={false} {navClass} {navDivClass}>
    <NavBrand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-1 sm:mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        DiamondLabs
      </span>
      <span
        class="self-center whitespace-nowrap text-xs font-semibold dark:text-white mt-1 ml-1"
        >{balance > 0 ? balance : 0}DND</span
      >
    </NavBrand>

    {#if isWalletInstalled}
      <div class="flex items-center lg:order-2">
        {#if isWalletInstalled && truncatedAccount === null}
          <button on:click={connectWallet} color="dark">
            Connect Wallet
          </button>
        {:else}
          <button on:click={connectWallet} color="dark">
            {truncatedAccount}
          </button>
        {/if}
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {:else}
      <div class="flex items-center lg:order-2">
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          <button color="dark">Install Wallet</button>
        </a>
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {/if}

    <NavUl
      {hidden}
      divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
      ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
    >
      <p
        on:click={() => (defaultModal = true)}
        class="hover:cursor-pointer hover:underline"
      >
        Transfer
      </p>
      <p on:click={getHistory} class="hover:cursor-pointer hover:underline">
        History
      </p>
      <p
        on:click={() => (repModal = true)}
        class="hover:cursor-pointer hover:underline"
      >
        Approve 3rd Party Agent
      </p>

      <p on:click={getDelegates} class="hover:cursor-pointer hover:underline">
        3rd Parties
      </p>
    </NavUl>
  </Navbar>

  <!-- show transfer modal -->
  <Modal title="" bind:open={defaultModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Transfer Diamond Tokens</h3>
      </div>
    </div>

    {#if !isWalletInstalled || (isWalletInstalled && truncatedAccount !== null)}
      <div>
        <Input
          placeholder={`Reciever's Wallet Address`}
          bind:value={_receiver}
          class="mb-2"
        />
        <Input
          placeholder={`Tokens Amount`}
          type="number"
          bind:value={amount}
        />
      </div>
      <div class="flex justify-between items-center gap-3">
        <div
          class="flex items-center space-x-3 sm:space-x-4"
          on:click={transferDiamond}
        >
          <Button disabled={loadingTransaction}>
            <HandThumbUp class="pr-2" />

            {#if !loadingTransaction}
              Transfer
            {:else}
              Transferring
            {/if}
          </Button>
        </div>

        <div
          class="flex items-center space-x-3 sm:space-x-4"
          on:click={hideModal}
        >
          <Button color="red">
            <HandThumbDown class="pr-2" />
            Cancel
          </Button>
        </div>
      </div>
    {:else}
      <div />
      <span class="block">Wallet not connected</span>
      <Button color="red" on:click={() => (defaultModal = false)}>
        <HandThumbDown class="pr-2" />
        Close
      </Button>
    {/if}
  </Modal>

  <!-- delegate funds -->
  <Modal title="" bind:open={repModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Delegate Diamond Tokens tp 3rd Party</h3>
      </div>
    </div>

    {#if !isWalletInstalled || (isWalletInstalled && truncatedAccount !== null)}
      <div>
        <Input
          placeholder={`3rd Party's Wallet Address`}
          bind:value={_delegate}
          class="mb-2"
        />
        <Input
          placeholder={`Tokens Amount`}
          type="number"
          bind:value={delegateAmount}
        />
      </div>
      <div class="flex justify-between items-center gap-3">
        <div
          class="flex items-center space-x-3 sm:space-x-4"
          on:click={appointRep}
        >
          <Button disabled={loadingDelegate}>
            <HandThumbUp class="pr-2" />

            {#if !loadingDelegate}
              Delegate
            {:else}
              Delegating
            {/if}
          </Button>
        </div>

        <div
          class="flex items-center space-x-3 sm:space-x-4"
          on:click={() => (repModal = false)}
        >
          <Button color="red">
            <HandThumbDown class="pr-2" />
            Cancel
          </Button>
        </div>
      </div>
    {:else}
      <div />
      <span class="block">Wallet not connected</span>
      <Button color="red" on:click={() => (repModal = false)}>
        <HandThumbDown class="pr-2" />
        Close
      </Button>
    {/if}
  </Modal>

  <!-- show reps list -->
  <Modal title="" bind:open={repListModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">All of your Delegates</h3>
      </div>
    </div>
    {#if delegates?.length > 0 && !loadingDelegate}
      <table class="table-auto border rounded-md p-2">
        <thead class="p-2">
          <tr class="border">
            <th class="border p-1"> address </th>
            <th class="border p-1"> amount given </th>
          </tr>
        </thead>
        <tbody class="p-2">
          {#each delegates as { _rep, balance }, i}
            <tr class="border">
              <td class="border">
                {truncateEthAddress(_rep)}
              </td>
              <td class="border">
                {balance}DND
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
    {#if loadingDelegate}
      <span>Loading Data</span>
    {/if}
    {#if !loadingDelegate && delegates.length == 0}
      <span>No Delegate</span>
    {/if}
    <div />
    <div class="flex justify-between items-center gap-3">
      <div
        class="flex items-center space-x-3 sm:space-x-4"
        on:click={hideDelegatesModal}
      >
        <Button color="red">
          <HandThumbDown class="pr-2" />
          Close
        </Button>
      </div>
    </div></Modal
  >

  <!-- show transfer history -->
  <Modal title="" bind:open={historyModal} size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Transaction History</h3>
      </div>
    </div>
    {#if transactionHistory.length > 0 && !loadingHistory}
      <table class="table-auto border rounded-md p-2">
        <thead class="p-2">
          <tr class="border">
            <th class="border p-1"> address </th>
            <th class="border p-1"> amount </th>
            <th class="border p-1"> date </th>
          </tr>
        </thead>
        <tbody class="p-2">
          {#each transactionHistory as { _to, amount, time }, i}
            <tr class="border">
              <td class="border">
                {truncateEthAddress(_to)}
              </td>
              <td class="border">
                {amount}DND
              </td>
              <td class="border">
                {formatTimestamp(time)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
    {#if loadingHistory}
      <span>Loading Data</span>
    {/if}
    {#if !loadingHistory && transactionHistory.length == 0}
      <span>No Transaction History</span>
    {/if}
    <div />
    <div class="flex justify-between items-center gap-3">
      <div
        class="flex items-center space-x-3 sm:space-x-4"
        on:click={hideHistoryModal}
      >
        <Button color="red">
          <HandThumbDown class="pr-2" />
          Close
        </Button>
      </div>
    </div></Modal
  >
</header>
